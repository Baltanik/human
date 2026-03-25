<script>
  import { onMount } from 'svelte';
  import { token, isAuthenticated, apiFetch } from '../stores/admin.js';
  import {
    Settings, Users, LogOut, LogIn, Eye, EyeOff,
    Save, Trash2, ChevronDown, ChevronUp, Search, X, Check,
    Tag, BarChart3, Target, Facebook, Calendar, Mail,
    Building2, Globe, TrendingUp, AlertCircle, AlertTriangle, RefreshCw,
    Download, Info, ExternalLink, CheckCircle2, XCircle
  } from 'lucide-svelte';

  // ── Auth ──────────────────────────────────────────────────────────────────
  let loginEmail = '';
  let loginPassword = '';
  let loginError = '';
  let loginLoading = false;
  let showPassword = false;

  async function handleLogin(e) {
    e.preventDefault();
    loginLoading = true;
    loginError = '';
    try {
      const { token: t } = await apiFetch('/api/session', {
        method: 'POST',
        body: { email: loginEmail, password: loginPassword }
      });
      token.login(t);
      await loadAll();
    } catch (err) {
      loginError = err.message;
    } finally {
      loginLoading = false;
    }
  }

  function handleLogout() {
    token.logout();
    activeTab = 'settings';
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────
  let activeTab = 'settings';

  // ── Settings ─────────────────────────────────────────────────────────────
  let settings = { gtm_id: '', ga4_id: '', google_ads_id: '', meta_pixel_id: '', calendly_url: '' };
  let savedSettings = { ...settings };
  let settingsSaving = false;
  let settingsSaved = false;
  let settingsError = '';

  const VALIDATORS = {
    gtm_id:        { regex: /^GTM-[A-Z0-9]{5,8}$/, hint: 'Formato: GTM-XXXXXXX' },
    ga4_id:        { regex: /^G-[A-Z0-9]{8,12}$/, hint: 'Formato: G-XXXXXXXXXX' },
    google_ads_id: { regex: /^AW-\d{8,12}$/, hint: 'Formato: AW-XXXXXXXXX' },
    meta_pixel_id: { regex: /^\d{12,16}$/, hint: 'Formato: 15 cifre numeriche' },
    calendly_url:  { regex: /^https:\/\/calendly\.com\/.+\/.+$/, hint: 'Formato: https://calendly.com/nome/evento' },
  };

  function isValid(key) {
    const val = settings[key];
    if (!val) return null;
    return VALIDATORS[key]?.regex.test(val) ? true : false;
  }

  $: isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  async function loadSettings() {
    try {
      const data = await apiFetch('/api/settings');
      settings = {
        gtm_id: data.gtm_id || '',
        ga4_id: data.ga4_id || '',
        google_ads_id: data.google_ads_id || '',
        meta_pixel_id: data.meta_pixel_id || '',
        calendly_url: data.calendly_url || ''
      };
      savedSettings = { ...settings };
    } catch (err) {
      settingsError = err.message;
    }
  }

  async function saveSettings() {
    settingsSaving = true;
    settingsSaved = false;
    settingsError = '';
    try {
      await apiFetch('/api/settings', { method: 'PUT', body: settings });
      savedSettings = { ...settings };
      settingsSaved = true;
      setTimeout(() => settingsSaved = false, 3000);
    } catch (err) {
      settingsError = err.message;
    } finally {
      settingsSaving = false;
    }
  }

  // ── Contacts ─────────────────────────────────────────────────────────────
  let contacts = [];
  let contactsLoading = false;
  let contactsError = '';
  let contactSearch = '';
  let contactStatusFilter = '';
  let selectedContact = null;
  let editNotes = '';
  let editStatus = '';
  let contactSaving = false;

  const STATUS_LABELS = {
    new: { label: 'New', color: '#7776e2' },
    contacted: { label: 'Contacted', color: '#f59e0b' },
    qualified: { label: 'Qualified', color: '#10b981' },
    proposal: { label: 'Proposal', color: '#3b82f6' },
    closed_won: { label: 'Won', color: '#059669' },
    closed_lost: { label: 'Lost', color: '#ef4444' }
  };

  async function loadContacts() {
    contactsLoading = true;
    contactsError = '';
    try {
      const params = new URLSearchParams();
      if (contactSearch) params.set('q', contactSearch);
      if (contactStatusFilter) params.set('status', contactStatusFilter);
      contacts = await apiFetch(`/api/contacts?${params}`);
    } catch (err) {
      contactsError = err.message;
    } finally {
      contactsLoading = false;
    }
  }

  function openContact(c) {
    selectedContact = c;
    editNotes = c.notes || '';
    editStatus = c.status;
  }

  function closeContact() {
    selectedContact = null;
  }

  async function saveContact() {
    contactSaving = true;
    try {
      await apiFetch(`/api/contacts/${selectedContact.id}`, {
        method: 'PATCH',
        body: { notes: editNotes, status: editStatus }
      });
      selectedContact = { ...selectedContact, notes: editNotes, status: editStatus };
      contacts = contacts.map(c => c.id === selectedContact.id ? selectedContact : c);
    } catch (err) {
      contactsError = err.message;
    } finally {
      contactSaving = false;
    }
  }

  async function deleteContact(id) {
    if (!confirm('Delete this contact? This cannot be undone.')) return;
    try {
      await apiFetch(`/api/contacts/${id}`, { method: 'DELETE' });
      contacts = contacts.filter(c => c.id !== id);
      if (selectedContact?.id === id) closeContact();
    } catch (err) {
      contactsError = err.message;
    }
  }

  let searchTimeout;
  function onSearchInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(loadContacts, 350);
  }

  // ── Multi-select ──────────────────────────────────────────────────────────
  let selectedIds = new Set();

  function toggleSelect(id) {
    selectedIds = selectedIds.has(id)
      ? (selectedIds.delete(id), new Set(selectedIds))
      : new Set(selectedIds.add(id));
  }

  function toggleSelectAll() {
    if (selectedIds.size === contacts.length) {
      selectedIds = new Set();
    } else {
      selectedIds = new Set(contacts.map(c => c.id));
    }
  }

  $: allSelected = contacts.length > 0 && selectedIds.size === contacts.length;
  $: exportTarget = selectedIds.size > 0
    ? contacts.filter(c => selectedIds.has(c.id))
    : contacts;

  // ── CSV export ────────────────────────────────────────────────────────────
  const CSV_COLS = [
    { key: 'id',         label: 'ID' },
    { key: 'first_name', label: 'Nome' },
    { key: 'last_name',  label: 'Cognome' },
    { key: 'email',      label: 'Email' },
    { key: 'company',    label: 'Azienda' },
    { key: 'website',    label: 'Sito' },
    { key: 'budget',     label: 'Budget' },
    { key: 'platforms',  label: 'Piattaforme' },
    { key: 'goals',      label: 'Obiettivi' },
    { key: 'status',     label: 'Stato' },
    { key: 'notes',      label: 'Note' },
    { key: 'created_at', label: 'Data' },
  ];

  function escCsv(val) {
    if (val === null || val === undefined) return '';
    const s = Array.isArray(val) ? val.join('; ') : String(val);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  }

  function exportCsv() {
    const rows = [
      CSV_COLS.map(c => c.label).join(','),
      ...exportTarget.map(row =>
        CSV_COLS.map(c => escCsv(row[c.key])).join(',')
      )
    ];
    const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date().toISOString().slice(0, 10);
    const label = contactStatusFilter ? `_${contactStatusFilter}` : '';
    const sel = selectedIds.size > 0 ? `_sel${selectedIds.size}` : '';
    a.download = `contatti${label}${sel}_${now}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  $: stats = Object.keys(STATUS_LABELS).map(k => ({
    key: k,
    label: STATUS_LABELS[k].label,
    color: STATUS_LABELS[k].color,
    count: contacts.filter(c => c.status === k).length
  })).filter(s => s.count > 0);

  // ── API Docs ──────────────────────────────────────────────────────────────
  let openDocs = {};
  function toggleDocs(key) {
    openDocs = { ...openDocs, [key]: !openDocs[key] };
  }

  const API_DOCS = {
    gtm: {
      title: 'Google Tag Manager',
      format: 'GTM-XXXXXXX',
      docsUrl: 'https://tagmanager.google.com/',
      intro: 'GTM è il contenitore che ospita tutti gli altri tag. Una volta configurato il Container ID qui, lo script GTM viene iniettato automaticamente su tutte le pagine. Da GTM configuri poi i singoli tag (GA4, Ads, Pixel…).',
      sections: [
        {
          label: 'Trigger da creare in GTM',
          type: 'triggers',
          items: [
            { name: 'Page View — All Pages', description: 'Tipo: Page View. Si attiva su tutte le pagine. Necessario per GA4 + Pixel PageView.' },
            { name: 'Click — CTA "Book a Call"', description: 'Tipo: Click — Solo Link. Filtro: Click URL contains /book-a-call. Oppure Click Classes contains "cta-book".' },
            { name: 'Form Submit — Contact', description: 'Tipo: Form Submission. Attiva sui submit del form contatti. Necessario per generate_lead.' },
            { name: 'Scroll Depth 50%', description: 'Tipo: Scroll Depth. Percentuali verticali: 50, 90. Per misurare engagement.' },
            { name: 'Timer — 30s Engagement', description: 'Tipo: Timer. Intervallo: 30000ms. Limite: 1. Per misurare sessioni engaged.' },
          ]
        },
        {
          label: 'Tag consigliati da creare in GTM',
          type: 'tags',
          items: [
            { name: 'GA4 — Configuration', description: 'Tag Type: Google Tag. ID: valore G-XXXXXXXXXX. Trigger: Page View All Pages.' },
            { name: 'GA4 — generate_lead', description: 'Tag Type: GA4 Event. Event name: generate_lead. Trigger: Form Submit Contact. Parametri: { method: "contact_form" }.' },
            { name: 'Google Ads — Conversion', description: 'Tag Type: Google Ads Conversion Tracking. Conversion ID: AW-XXXXXXXXX. Trigger: Form Submit Contact.' },
            { name: 'Meta Pixel — PageView', description: 'Tag Type: Custom HTML. Contenuto: fbq("track","PageView"). Trigger: Page View All Pages.' },
            { name: 'Meta Pixel — Lead', description: 'Tag Type: Custom HTML. Contenuto: fbq("track","Lead"). Trigger: Form Submit Contact.' },
          ]
        }
      ]
    },
    ga4: {
      title: 'Google Analytics 4',
      format: 'G-XXXXXXXXXX',
      docsUrl: 'https://analytics.google.com/',
      intro: 'Il Measurement ID identifica la tua property GA4. Viene usato sia nel tag GTM "Google Tag" (configurazione base) sia in eventuali event tag. Non serve inserirlo direttamente nel codice se GTM è attivo.',
      sections: [
        {
          label: 'Eventi tracciati automaticamente (Enhanced Measurement)',
          type: 'events',
          items: [
            { name: 'page_view', description: 'Attivato ad ogni cambio pagina. Parametri: page_title, page_location, page_referrer.' },
            { name: 'scroll', description: 'Attivato al 90% di scroll verticale. Parametro: percent_scrolled = 90.' },
            { name: 'click (outbound)', description: 'Clic su link esterni al dominio. Parametri: link_url, link_domain.' },
            { name: 'session_start', description: 'Prima hit di ogni sessione.' },
            { name: 'first_visit', description: 'Solo al primo accesso di ogni utente.' },
          ]
        },
        {
          label: 'Eventi custom tracciati dal sito',
          type: 'events',
          items: [
            { name: 'generate_lead', description: 'Submit form "Book a Call" completato con successo. Parametri: { form_id: "book-a-call", method: "contact_form" }.' },
            { name: 'book_call_click', description: 'Click su qualsiasi CTA "Book a Call" o "Prenota una call". Parametri: { cta_location: "<sezione>" }.' },
            { name: 'service_view', description: 'Scroll fino alla sezione Servizi. Parametri: { section: "services" }.' },
          ]
        }
      ]
    },
    google_ads: {
      title: 'Google Ads',
      format: 'AW-XXXXXXXXX',
      docsUrl: 'https://ads.google.com/',
      intro: 'Il Conversion ID collega le conversioni del sito alla tua campagna Google Ads. Va configurato in GTM come tag "Google Ads Conversion Tracking". Ogni obiettivo di conversione ha anche una Conversion Label separata (da recuperare in Google Ads > Obiettivi > Conversioni).',
      sections: [
        {
          label: 'Conversioni da tracciare',
          type: 'events',
          items: [
            { name: 'Submit Lead Form', description: 'Evento principale. Trigger: submit form "Book a Call". In GTM: tag Google Ads Conversion, Conversion ID = AW-XXXXXXXXX, Conversion Label = recupera da Google Ads.' },
            { name: 'Book Call Click', description: 'Micro-conversione. Trigger: click su CTA "Book a Call". Utile per campagne awareness con obiettivo click.' },
            { name: 'Phone Click', description: 'Micro-conversione. Trigger: click su numero telefono (se presente). Tipo: chiamata da sito web.' },
          ]
        },
        {
          label: 'Remarketing audiences (da GTM)',
          type: 'tags',
          items: [
            { name: 'Google Ads Remarketing Tag', description: 'Tag Type: Google Ads Remarketing. Inserisci Conversion ID. Trigger: Page View All Pages. Popola audience per retargeting.' },
          ]
        }
      ]
    },
    meta_pixel: {
      title: 'Meta Pixel',
      format: '123456789012345',
      docsUrl: 'https://business.facebook.com/events_manager',
      intro: 'Il Pixel ID viene usato per tracciare eventi sul sito e creare audience personalizzate su Meta Ads. Il codice base (fbq init + PageView) è già iniettato automaticamente. Gli eventi aggiuntivi si aggiungono tramite GTM (Custom HTML) o Conversions API.',
      sections: [
        {
          label: 'Standard Events — già implementati',
          type: 'events',
          items: [
            { name: 'PageView', description: 'Attivato su ogni pagina. Codice: fbq("track", "PageView"). Iniettato automaticamente dal sito.' },
            { name: 'Lead', description: 'Submit form "Book a Call". Codice: fbq("track", "Lead"). Da aggiungere in GTM su trigger Form Submit.' },
            { name: 'Contact', description: 'Alternativa a Lead per distinguere tipo di contatto. Codice: fbq("track", "Contact").' },
            { name: 'ViewContent', description: 'Visita a pagine chiave (es. /services, /about). Codice: fbq("track", "ViewContent", { content_name: "<nome pagina>" }).' },
            { name: 'Schedule', description: 'Click su link Calendly. Codice: fbq("track", "Schedule"). Indica interesse concreto alla call.' },
          ]
        },
        {
          label: 'Custom Events',
          type: 'events',
          items: [
            { name: 'InitiateContact', description: 'Click su CTA "Book a Call" (prima ancora del submit). Codice: fbq("trackCustom", "InitiateContact", { cta_location: "<sezione>" }).' },
            { name: 'ScrollEngaged', description: 'Scroll >50% della pagina. Segnale di engagement per ottimizzazione campagne.' },
          ]
        },
        {
          label: 'Setup consigliato in Events Manager',
          type: 'tags',
          items: [
            { name: 'Test Events', description: 'In Events Manager > Test Events, incolla l\'URL del sito per verificare in real-time che PageView e Lead arrivino correttamente.' },
            { name: 'Conversions API (CAPI)', description: 'Per massimizzare il match rate, configura anche CAPI lato server (da server/index.js) inviando gli stessi eventi con hashed email/phone.' },
            { name: 'Aggregated Event Measurement', description: 'Dopo aver configurato tutti gli eventi, vai su Events Manager > Aggregated Event Measurement e prioritizza: 1. Lead, 2. Schedule, 3. ViewContent.' },
          ]
        }
      ]
    },
    calendly: {
      title: 'Calendly',
      format: 'https://calendly.com/tuonome/30min',
      docsUrl: 'https://calendly.com/event_types/user/me',
      intro: 'L\'URL del tuo evento Calendly viene usato per generare l\'embed widget nella pagina "Book a Call". L\'URL si trova nel tuo account Calendly sotto Event Types > Share.',
      sections: [
        {
          label: 'Come ottenere l\'URL',
          type: 'tags',
          items: [
            { name: '1. Accedi a Calendly', description: 'Vai su calendly.com e accedi al tuo account.' },
            { name: '2. Event Types', description: 'Seleziona l\'evento (es. "30 Minute Meeting") dalla lista dei tuoi event types.' },
            { name: '3. Copia il link', description: 'Clicca "Copy Link" o prendi l\'URL dalla barra del browser. Il formato è: https://calendly.com/tuonome/nome-evento' },
          ]
        },
        {
          label: 'Integrazione nel sito',
          type: 'events',
          items: [
            { name: 'Embed automatico', description: 'Il widget Calendly viene caricato automaticamente nella pagina "Book a Call" (step 4). Se l\'URL non è configurato, appare un placeholder.' },
            { name: 'Parametri passati', description: 'Il widget nasconde automaticamente i dettagli evento e il banner GDPR per un\'esperienza più pulita (hide_event_type_details=1, hide_gdpr_banner=1).' },
          ]
        }
      ]
    }
  };

  function downloadApiDoc(key) {
    const doc = API_DOCS[key];
    const payload = {
      integration: doc.title,
      generated_at: new Date().toISOString(),
      format: doc.format,
      docs_url: doc.docsUrl,
      description: doc.intro,
      sections: doc.sections
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spec_${key}_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  async function loadAll() {
    await Promise.all([loadSettings(), loadContacts()]);
  }

  onMount(() => {
    if ($isAuthenticated) loadAll();
  });

  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  }
</script>

<div class="admin-shell">
  {#if !$isAuthenticated}
    <!-- LOGIN -->
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">
          <span>Human</span>
          <span class="login-badge">Admin</span>
        </div>
        <h1>Accedi al pannello</h1>
        <form on:submit={handleLogin}>
          <div class="form-group">
            <label for="adm-email">Email</label>
            <input id="adm-email" type="email" bind:value={loginEmail} placeholder="admin@humanmarketing.it" autocomplete="email" required />
          </div>
          <div class="form-group">
            <label for="adm-pw">Password</label>
            <div class="input-with-icon">
              <input
                id="adm-pw"
                type={showPassword ? 'text' : 'password'}
                bind:value={loginPassword}
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button type="button" class="eye-btn" on:click={() => showPassword = !showPassword}>
                {#if showPassword}<EyeOff size={16} />{:else}<Eye size={16} />{/if}
              </button>
            </div>
          </div>
          {#if loginError}
            <div class="alert alert-error"><AlertCircle size={16} /> {loginError}</div>
          {/if}
          <button type="submit" class="btn btn-primary btn-full" disabled={loginLoading}>
            {#if loginLoading}<span class="spinner"></span>{:else}<LogIn size={16} />Accedi{/if}
          </button>
        </form>
      </div>
    </div>

  {:else}
    <!-- ADMIN SHELL -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span>Human</span>
        <span class="login-badge">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <button class="nav-item" class:active={activeTab === 'settings'} on:click={() => activeTab = 'settings'}>
          <Settings size={18} /> API & Integrazioni
        </button>
        <button class="nav-item" class:active={activeTab === 'contacts'} on:click={() => { activeTab = 'contacts'; loadContacts(); }}>
          <Users size={18} /> Contatti
          {#if contacts.filter(c => c.status === 'new').length > 0}
            <span class="badge">{contacts.filter(c => c.status === 'new').length}</span>
          {/if}
        </button>
      </nav>
      <button class="nav-item logout" on:click={handleLogout}>
        <LogOut size={18} /> Esci
      </button>
    </aside>

    <main class="admin-main">

      <!-- ── SETTINGS TAB ── -->
      {#if activeTab === 'settings'}
        <div class="page-header">
          <h2>API & Integrazioni</h2>
          <p>Le chiavi vengono iniettate automaticamente nel sito. Salva dopo ogni modifica.</p>
        </div>

        {#if settingsError}
          <div class="alert alert-error"><AlertCircle size={16} /> {settingsError}</div>
        {/if}

        <div class="cards-grid">
          <!-- GTM -->
          <div class="card">
            <div class="card-header">
              <Tag size={20} />
              <div>
                <h3>Google Tag Manager</h3>
                <p>Container ID (es. GTM-XXXXXXX)</p>
              </div>
              {#if savedSettings.gtm_id && isValid('gtm_id') !== false}
                <span class="card-badge card-badge--ok"><CheckCircle2 size={13} /> Attivo</span>
              {:else if !savedSettings.gtm_id}
                <span class="card-badge card-badge--empty">Non configurato</span>
              {/if}
            </div>
            <div class="input-validated">
              <input type="text" bind:value={settings.gtm_id} placeholder="GTM-XXXXXXX" class="api-input" class:input-ok={isValid('gtm_id') === true} class:input-err={isValid('gtm_id') === false} />
              {#if isValid('gtm_id') === true}
                <span class="input-icon input-icon--ok"><CheckCircle2 size={16} /></span>
              {:else if isValid('gtm_id') === false}
                <span class="input-icon input-icon--err"><XCircle size={16} /></span>
              {/if}
            </div>
            {#if isValid('gtm_id') === false}
              <p class="input-hint input-hint--err">{VALIDATORS.gtm_id.hint}</p>
            {/if}
            <div class="doc-accordion" class:open={openDocs.gtm}>
              <button class="doc-toggle" on:click={() => toggleDocs('gtm')}>
                <Info size={14} />
                <span>Guida all'implementazione</span>
                {#if openDocs.gtm}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
              </button>
              {#if openDocs.gtm}
                <div class="doc-body">
                  <p class="doc-intro">{API_DOCS.gtm.intro}</p>
                  {#each API_DOCS.gtm.sections as section}
                    <div class="doc-section">
                      <h4 class="doc-section-title">{section.label}</h4>
                      <div class="doc-items">
                        {#each section.items as item}
                          <div class="doc-item doc-item--{section.type}">
                            <code class="doc-event-name">{item.name}</code>
                            <p>{item.description}</p>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  <div class="doc-footer">
                    <a href={API_DOCS.gtm.docsUrl} target="_blank" rel="noopener" class="doc-link">
                      <ExternalLink size={13} /> Apri Tag Manager
                    </a>
                    <button class="btn-doc-download" on:click={() => downloadApiDoc('gtm')}>
                      <Download size={13} /> Scarica spec JSON
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- GA4 -->
          <div class="card">
            <div class="card-header">
              <BarChart3 size={20} />
              <div>
                <h3>Google Analytics 4</h3>
                <p>Measurement ID (es. G-XXXXXXXXXX)</p>
              </div>
              {#if savedSettings.ga4_id && isValid('ga4_id') !== false}
                <span class="card-badge card-badge--ok"><CheckCircle2 size={13} /> Attivo</span>
              {:else if !savedSettings.ga4_id}
                <span class="card-badge card-badge--empty">Non configurato</span>
              {/if}
            </div>
            {#if settings.gtm_id}
              <div class="alert alert-warn"><AlertTriangle size={14} /> GTM è attivo: GA4 va configurato come tag dentro GTM, non verrà iniettato standalone.</div>
            {/if}
            <div class="input-validated">
              <input type="text" bind:value={settings.ga4_id} placeholder="G-XXXXXXXXXX" class="api-input" class:input-ok={isValid('ga4_id') === true} class:input-err={isValid('ga4_id') === false} />
              {#if isValid('ga4_id') === true}
                <span class="input-icon input-icon--ok"><CheckCircle2 size={16} /></span>
              {:else if isValid('ga4_id') === false}
                <span class="input-icon input-icon--err"><XCircle size={16} /></span>
              {/if}
            </div>
            {#if isValid('ga4_id') === false}
              <p class="input-hint input-hint--err">{VALIDATORS.ga4_id.hint}</p>
            {/if}
            <div class="doc-accordion" class:open={openDocs.ga4}>
              <button class="doc-toggle" on:click={() => toggleDocs('ga4')}>
                <Info size={14} />
                <span>Guida all'implementazione</span>
                {#if openDocs.ga4}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
              </button>
              {#if openDocs.ga4}
                <div class="doc-body">
                  <p class="doc-intro">{API_DOCS.ga4.intro}</p>
                  {#each API_DOCS.ga4.sections as section}
                    <div class="doc-section">
                      <h4 class="doc-section-title">{section.label}</h4>
                      <div class="doc-items">
                        {#each section.items as item}
                          <div class="doc-item doc-item--{section.type}">
                            <code class="doc-event-name">{item.name}</code>
                            <p>{item.description}</p>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  <div class="doc-footer">
                    <a href={API_DOCS.ga4.docsUrl} target="_blank" rel="noopener" class="doc-link">
                      <ExternalLink size={13} /> Apri Analytics
                    </a>
                    <button class="btn-doc-download" on:click={() => downloadApiDoc('ga4')}>
                      <Download size={13} /> Scarica spec JSON
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- Google Ads -->
          <div class="card">
            <div class="card-header">
              <Target size={20} />
              <div>
                <h3>Google Ads</h3>
                <p>Conversion ID (es. AW-XXXXXXXXX)</p>
              </div>
              {#if savedSettings.google_ads_id && isValid('google_ads_id') !== false}
                <span class="card-badge card-badge--ok"><CheckCircle2 size={13} /> Attivo</span>
              {:else if !savedSettings.google_ads_id}
                <span class="card-badge card-badge--empty">Non configurato</span>
              {/if}
            </div>
            {#if settings.gtm_id}
              <div class="alert alert-warn"><AlertTriangle size={14} /> GTM è attivo: Google Ads va configurato come tag dentro GTM, non verrà iniettato standalone.</div>
            {/if}
            <div class="input-validated">
              <input type="text" bind:value={settings.google_ads_id} placeholder="AW-XXXXXXXXX" class="api-input" class:input-ok={isValid('google_ads_id') === true} class:input-err={isValid('google_ads_id') === false} />
              {#if isValid('google_ads_id') === true}
                <span class="input-icon input-icon--ok"><CheckCircle2 size={16} /></span>
              {:else if isValid('google_ads_id') === false}
                <span class="input-icon input-icon--err"><XCircle size={16} /></span>
              {/if}
            </div>
            {#if isValid('google_ads_id') === false}
              <p class="input-hint input-hint--err">{VALIDATORS.google_ads_id.hint}</p>
            {/if}
            <div class="doc-accordion" class:open={openDocs.google_ads}>
              <button class="doc-toggle" on:click={() => toggleDocs('google_ads')}>
                <Info size={14} />
                <span>Guida all'implementazione</span>
                {#if openDocs.google_ads}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
              </button>
              {#if openDocs.google_ads}
                <div class="doc-body">
                  <p class="doc-intro">{API_DOCS.google_ads.intro}</p>
                  {#each API_DOCS.google_ads.sections as section}
                    <div class="doc-section">
                      <h4 class="doc-section-title">{section.label}</h4>
                      <div class="doc-items">
                        {#each section.items as item}
                          <div class="doc-item doc-item--{section.type}">
                            <code class="doc-event-name">{item.name}</code>
                            <p>{item.description}</p>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  <div class="doc-footer">
                    <a href={API_DOCS.google_ads.docsUrl} target="_blank" rel="noopener" class="doc-link">
                      <ExternalLink size={13} /> Apri Google Ads
                    </a>
                    <button class="btn-doc-download" on:click={() => downloadApiDoc('google_ads')}>
                      <Download size={13} /> Scarica spec JSON
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- Meta Pixel -->
          <div class="card">
            <div class="card-header">
              <Facebook size={20} />
              <div>
                <h3>Meta Pixel</h3>
                <p>Pixel ID (es. 123456789012345)</p>
              </div>
              {#if savedSettings.meta_pixel_id && isValid('meta_pixel_id') !== false}
                <span class="card-badge card-badge--ok"><CheckCircle2 size={13} /> Attivo</span>
              {:else if !savedSettings.meta_pixel_id}
                <span class="card-badge card-badge--empty">Non configurato</span>
              {/if}
            </div>
            <div class="input-validated">
              <input type="text" bind:value={settings.meta_pixel_id} placeholder="123456789012345" class="api-input" class:input-ok={isValid('meta_pixel_id') === true} class:input-err={isValid('meta_pixel_id') === false} />
              {#if isValid('meta_pixel_id') === true}
                <span class="input-icon input-icon--ok"><CheckCircle2 size={16} /></span>
              {:else if isValid('meta_pixel_id') === false}
                <span class="input-icon input-icon--err"><XCircle size={16} /></span>
              {/if}
            </div>
            {#if isValid('meta_pixel_id') === false}
              <p class="input-hint input-hint--err">{VALIDATORS.meta_pixel_id.hint}</p>
            {/if}
            <div class="doc-accordion" class:open={openDocs.meta_pixel}>
              <button class="doc-toggle" on:click={() => toggleDocs('meta_pixel')}>
                <Info size={14} />
                <span>Guida all'implementazione</span>
                {#if openDocs.meta_pixel}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
              </button>
              {#if openDocs.meta_pixel}
                <div class="doc-body">
                  <p class="doc-intro">{API_DOCS.meta_pixel.intro}</p>
                  {#each API_DOCS.meta_pixel.sections as section}
                    <div class="doc-section">
                      <h4 class="doc-section-title">{section.label}</h4>
                      <div class="doc-items">
                        {#each section.items as item}
                          <div class="doc-item doc-item--{section.type}">
                            <code class="doc-event-name">{item.name}</code>
                            <p>{item.description}</p>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  <div class="doc-footer">
                    <a href={API_DOCS.meta_pixel.docsUrl} target="_blank" rel="noopener" class="doc-link">
                      <ExternalLink size={13} /> Apri Events Manager
                    </a>
                    <button class="btn-doc-download" on:click={() => downloadApiDoc('meta_pixel')}>
                      <Download size={13} /> Scarica spec JSON
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          <!-- Calendly -->
          <div class="card card-wide">
            <div class="card-header">
              <Calendar size={20} />
              <div>
                <h3>Calendly</h3>
                <p>URL del tuo evento Calendly (es. https://calendly.com/tuonome/30min)</p>
              </div>
              {#if savedSettings.calendly_url && isValid('calendly_url') !== false}
                <span class="card-badge card-badge--ok"><CheckCircle2 size={13} /> Attivo</span>
              {:else if !savedSettings.calendly_url}
                <span class="card-badge card-badge--empty">Non configurato</span>
              {/if}
            </div>
            <div class="input-validated">
              <input type="url" bind:value={settings.calendly_url} placeholder="https://calendly.com/tuonome/30min" class="api-input" class:input-ok={isValid('calendly_url') === true} class:input-err={isValid('calendly_url') === false} />
              {#if isValid('calendly_url') === true}
                <span class="input-icon input-icon--ok"><CheckCircle2 size={16} /></span>
              {:else if isValid('calendly_url') === false}
                <span class="input-icon input-icon--err"><XCircle size={16} /></span>
              {/if}
            </div>
            {#if isValid('calendly_url') === false}
              <p class="input-hint input-hint--err">{VALIDATORS.calendly_url.hint}</p>
            {/if}
            <div class="doc-accordion" class:open={openDocs.calendly}>
              <button class="doc-toggle" on:click={() => toggleDocs('calendly')}>
                <Info size={14} />
                <span>Guida all'implementazione</span>
                {#if openDocs.calendly}<ChevronUp size={14} />{:else}<ChevronDown size={14} />{/if}
              </button>
              {#if openDocs.calendly}
                <div class="doc-body">
                  <p class="doc-intro">{API_DOCS.calendly.intro}</p>
                  {#each API_DOCS.calendly.sections as section}
                    <div class="doc-section">
                      <h4 class="doc-section-title">{section.label}</h4>
                      <div class="doc-items">
                        {#each section.items as item}
                          <div class="doc-item doc-item--{section.type}">
                            <code class="doc-event-name">{item.name}</code>
                            <p>{item.description}</p>
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                  <div class="doc-footer">
                    <a href={API_DOCS.calendly.docsUrl} target="_blank" rel="noopener" class="doc-link">
                      <ExternalLink size={13} /> Apri Calendly
                    </a>
                    <button class="btn-doc-download" on:click={() => downloadApiDoc('calendly')}>
                      <Download size={13} /> Scarica spec JSON
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>

        <div class="save-bar">
          {#if isDirty}
            <span class="dirty-label"><AlertCircle size={14} /> Modifiche non salvate</span>
          {/if}
          <button class="btn btn-primary" class:btn-saved={settingsSaved} on:click={saveSettings} disabled={settingsSaving || (!isDirty && !settingsSaved)}>
            {#if settingsSaving}
              <span class="spinner"></span> Salvataggio...
            {:else if settingsSaved}
              <Check size={16} /> Salvato!
            {:else}
              <Save size={16} /> Salva impostazioni
            {/if}
          </button>
        </div>

      <!-- ── CONTACTS TAB ── -->
      {:else if activeTab === 'contacts'}
        <div class="page-header">
          <h2>Contatti & Lead</h2>
          <p>Tutti i lead raccolti dal form "Book a Call". {contacts.length > 0 ? `${contacts.length} contatti totali.` : ''}</p>
        </div>

        <!-- Stats pills -->
        {#if stats.length > 0}
          <div class="stats-row">
            <button
              class="stat-pill"
              class:active={contactStatusFilter === ''}
              on:click={() => { contactStatusFilter = ''; loadContacts(); }}
            >
              Tutti <span>{contacts.length}</span>
            </button>
            {#each stats as s}
              <button
                class="stat-pill"
                class:active={contactStatusFilter === s.key}
                style="--sc: {s.color}"
                on:click={() => { contactStatusFilter = s.key; loadContacts(); }}
              >
                {s.label} <span>{s.count}</span>
              </button>
            {/each}
          </div>
        {/if}

        <div class="contacts-toolbar">
          <div class="search-box">
            <Search size={16} />
            <input
              type="text"
              bind:value={contactSearch}
              on:input={onSearchInput}
              placeholder="Cerca nome, email, azienda…"
            />
            {#if contactSearch}
              <button on:click={() => { contactSearch = ''; loadContacts(); }}><X size={14} /></button>
            {/if}
          </div>
          <select bind:value={contactStatusFilter} on:change={loadContacts}>
            <option value="">Tutti gli stati</option>
            {#each Object.entries(STATUS_LABELS) as [val, s]}
              <option value={val}>{s.label}</option>
            {/each}
          </select>
          <button class="toolbar-btn toolbar-refresh" on:click={loadContacts} title="Aggiorna">
            <RefreshCw size={15} />
          </button>
          <button class="toolbar-btn toolbar-export" on:click={exportCsv}>
            <Download size={15} />
            {selectedIds.size > 0 ? `Esporta ${selectedIds.size} selezionati` : `Esporta CSV`}
          </button>
        </div>

        {#if contactsError}
          <div class="alert alert-error"><AlertCircle size={16} /> {contactsError}</div>
        {/if}

        {#if contactsLoading}
          <div class="loading-row"><span class="spinner"></span> Caricamento…</div>
        {:else if contacts.length === 0}
          <div class="empty-state">
            <Users size={40} />
            <p>Nessun contatto trovato.</p>
          </div>
        {:else}
          <div class="contacts-layout" class:split={!!selectedContact}>
            <!-- List -->
            <div class="contacts-list">

              <!-- Select-all header -->
              <div class="list-header">
                <label class="checkbox-wrap">
                  <input type="checkbox" checked={allSelected} on:change={toggleSelectAll} />
                  <span>{allSelected ? 'Deseleziona tutti' : `Seleziona tutti (${contacts.length})`}</span>
                </label>
                {#if selectedIds.size > 0}
                  <span class="sel-count">{selectedIds.size} selezionati</span>
                {/if}
              </div>

              {#each contacts as c (c.id)}
                <div class="contact-row-wrap" class:checked={selectedIds.has(c.id)}>
                  <label class="row-checkbox" on:click|stopPropagation>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      on:change={() => toggleSelect(c.id)}
                    />
                  </label>
                  <button
                    class="contact-row"
                    class:active={selectedContact?.id === c.id}
                    on:click={() => openContact(c)}
                  >
                    <div class="contact-avatar">{c.first_name[0]}{c.last_name[0]}</div>
                    <div class="contact-info">
                      <strong>{c.first_name} {c.last_name}</strong>
                      <span>{c.email}</span>
                      {#if c.company}<span class="contact-company">{c.company}</span>{/if}
                    </div>
                    <div class="contact-meta">
                      <span class="status-chip" style="--sc: {STATUS_LABELS[c.status]?.color || '#999'}">
                        {STATUS_LABELS[c.status]?.label || c.status}
                      </span>
                      <span class="contact-date">{formatDate(c.created_at)}</span>
                    </div>
                  </button>
                </div>
              {/each}
            </div>

            <!-- Detail -->
            {#if selectedContact}
              <div class="contact-detail">
                <div class="detail-header">
                  <div class="detail-avatar">{selectedContact.first_name[0]}{selectedContact.last_name[0]}</div>
                  <div>
                    <h3>{selectedContact.first_name} {selectedContact.last_name}</h3>
                    <a href="mailto:{selectedContact.email}">{selectedContact.email}</a>
                  </div>
                  <button class="close-btn" on:click={closeContact}><X size={18} /></button>
                </div>

                <div class="detail-fields">
                  {#if selectedContact.company}
                    <div class="detail-field">
                      <Building2 size={14} /><span>{selectedContact.company}</span>
                    </div>
                  {/if}
                  {#if selectedContact.website}
                    <div class="detail-field">
                      <Globe size={14} /><a href="https://{selectedContact.website}" target="_blank">{selectedContact.website}</a>
                    </div>
                  {/if}
                  {#if selectedContact.budget}
                    <div class="detail-field">
                      <TrendingUp size={14} /><span>Budget: {selectedContact.budget}</span>
                    </div>
                  {/if}
                  {#if selectedContact.platforms?.length}
                    <div class="detail-field">
                      <Target size={14} /><span>Piattaforme: {selectedContact.platforms.join(', ')}</span>
                    </div>
                  {/if}
                  {#if selectedContact.goals}
                    <div class="detail-field goals">
                      <Mail size={14} /><span>{selectedContact.goals}</span>
                    </div>
                  {/if}
                  <div class="detail-field">
                    <Calendar size={14} /><span>Ricevuto il {formatDate(selectedContact.created_at)}</span>
                  </div>
                </div>

                <div class="detail-edit">
                  <label>Stato
                    <select bind:value={editStatus}>
                      {#each Object.entries(STATUS_LABELS) as [val, s]}
                        <option value={val}>{s.label}</option>
                      {/each}
                    </select>
                  </label>
                  <label>Note interne
                    <textarea bind:value={editNotes} rows="4" placeholder="Appunti, follow-up, link call…"></textarea>
                  </label>
                </div>

                <div class="detail-actions">
                  <button class="btn btn-primary" on:click={saveContact} disabled={contactSaving}>
                    {#if contactSaving}<span class="spinner"></span>{:else}<Save size={15} />{/if}
                    Salva
                  </button>
                  <button class="btn btn-danger" on:click={() => deleteContact(selectedContact.id)}>
                    <Trash2 size={15} /> Elimina
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      {/if}
    </main>
  {/if}
</div>

<style>
  :global(body):has(.admin-shell) {
    background: #f5f5f7;
  }

  .admin-shell {
    display: flex;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* ── LOGIN ── */
  .login-page {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f5f7 0%, #ebebf5 100%);
    padding: 2rem;
  }

  .login-card {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  }

  .login-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 2rem;
  }

  .login-badge {
    background: #7776e2;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.55rem;
    border-radius: 20px;
    letter-spacing: 0.04em;
  }

  .login-card h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 1.5rem;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px;
    background: white;
    border-right: 1px solid #e8e8ed;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
  }

  .sidebar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: #1a1a2e;
    padding: 0 1.25rem 1.5rem;
    border-bottom: 1px solid #e8e8ed;
    margin-bottom: 1rem;
  }

  .sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.75rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.75rem;
    border-radius: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    width: 100%;
    text-align: left;
    transition: all 0.15s;
  }

  .nav-item:hover { background: #f5f5f7; color: #1a1a2e; }
  .nav-item.active { background: rgba(119, 118, 226, 0.1); color: #7776e2; font-weight: 600; }

  .nav-item.logout {
    margin: 0.75rem;
    color: #ef4444;
    margin-top: auto;
  }
  .nav-item.logout:hover { background: #fff5f5; }

  .badge {
    margin-left: auto;
    background: #7776e2;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.15rem 0.5rem;
    border-radius: 20px;
    min-width: 20px;
    text-align: center;
  }

  /* ── MAIN ── */
  .admin-main {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .page-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 0.35rem;
  }

  .page-header p {
    color: #888;
    font-size: 0.95rem;
  }

  /* ── CARDS GRID ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid #e8e8ed;
  }

  .card-wide {
    grid-column: 1 / -1;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
    color: #7776e2;
  }

  .card-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 0.2rem;
  }

  .card-header p {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
  }

  .api-input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 2px solid #e8e8ed;
    border-radius: 10px;
    font-size: 0.95rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: #fafafa;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .api-input:focus {
    outline: none;
    border-color: #7776e2;
    background: white;
    box-shadow: 0 0 0 4px rgba(119,118,226,0.1);
  }

  .save-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
  }

  /* ── CONTACTS ── */
  .contacts-toolbar {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .toolbar-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
    font-family: inherit;
  }

  .toolbar-refresh {
    padding: 0.72rem 0.9rem;
    background: white;
    color: #444;
    border: 2px solid #d0d0da;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  }

  .toolbar-refresh:hover {
    background: #f0f0f7;
    border-color: #aaa;
    color: #111;
  }

  .toolbar-export {
    padding: 0.72rem 1.1rem;
    background: #7776e2;
    color: white;
    border: 2px solid #7776e2;
    box-shadow: 0 2px 8px rgba(119,118,226,0.3);
  }

  .toolbar-export:hover {
    background: #6665d2;
    border-color: #6665d2;
    box-shadow: 0 4px 12px rgba(119,118,226,0.4);
  }

  .search-box {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    border: 2px solid #e2e2ea;
    border-radius: 10px;
    padding: 0 1rem;
    color: #888;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .search-box:focus-within {
    border-color: #7776e2;
    box-shadow: 0 0 0 3px rgba(119,118,226,0.1);
  }

  .search-box input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.75rem 0;
    font-size: 0.9rem;
    background: transparent;
    color: #1a1a2e;
  }

  .search-box input::placeholder { color: #bbb; }

  .search-box button {
    background: none;
    border: none;
    cursor: pointer;
    color: #bbb;
    display: flex;
    align-items: center;
    padding: 0.2rem;
    border-radius: 4px;
  }

  .search-box button:hover { color: #666; }

  .contacts-toolbar select {
    padding: 0.72rem 1rem;
    border: 2px solid #d0d0da;
    border-radius: 10px;
    background: white;
    font-size: 0.875rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    appearance: auto;
    font-family: inherit;
  }

  .contacts-toolbar select:focus {
    outline: none;
    border-color: #7776e2;
    box-shadow: 0 0 0 3px rgba(119,118,226,0.12);
  }

  .contacts-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .contacts-layout.split {
    grid-template-columns: 1fr 380px;
  }

  .contacts-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: white;
    border: 2px solid #e8e8ed;
    border-radius: 12px;
    cursor: pointer;
    text-align: left;
    width: 100%;
    transition: all 0.15s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .contact-row:hover { border-color: #7776e2; box-shadow: 0 2px 8px rgba(119,118,226,0.12); }
  .contact-row.active { border-color: #7776e2; background: rgba(119,118,226,0.04); }

  .contact-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7776e2, #a09fe6);
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: uppercase;
  }

  .contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .contact-info strong {
    font-size: 0.95rem;
    color: #1a1a2e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .contact-info span {
    font-size: 0.8rem;
    color: #888;
  }

  .contact-company {
    font-size: 0.78rem !important;
    color: #aaa !important;
  }

  .contact-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.3rem;
    flex-shrink: 0;
  }

  .status-chip {
    background: color-mix(in srgb, var(--sc) 15%, white);
    color: var(--sc);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    white-space: nowrap;
  }

  .contact-date {
    font-size: 0.75rem;
    color: #bbb;
  }

  /* ── DETAIL PANEL ── */
  .contact-detail {
    background: white;
    border: 1px solid #e8e8ed;
    border-radius: 16px;
    padding: 1.5rem;
    position: sticky;
    top: 1.5rem;
    height: fit-content;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
  }

  .detail-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #e8e8ed;
  }

  .detail-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7776e2, #a09fe6);
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: uppercase;
  }

  .detail-header h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 0.2rem;
  }

  .detail-header a {
    font-size: 0.85rem;
    color: #7776e2;
    text-decoration: none;
  }

  .close-btn {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    color: #aaa;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .close-btn:hover { background: #f5f5f7; color: #666; }

  .detail-fields {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .detail-field {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: #555;
  }

  .detail-field :global(svg) { flex-shrink: 0; margin-top: 1px; color: #aaa; }
  .detail-field a { color: #7776e2; text-decoration: none; }
  .detail-field.goals span { line-height: 1.5; }

  .detail-edit {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .detail-edit label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .detail-edit select,
  .detail-edit textarea {
    padding: 0.7rem 0.9rem;
    border: 1.5px solid #e8e8ed;
    border-radius: 10px;
    font-size: 0.875rem;
    font-family: inherit;
    background: #fafafa;
    resize: vertical;
    transition: border-color 0.2s;
  }

  .detail-edit select:focus,
  .detail-edit textarea:focus {
    outline: none;
    border-color: #7776e2;
    background: white;
  }

  .detail-actions {
    display: flex;
    gap: 0.75rem;
  }

  /* ── SHARED ── */
  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 2px solid #e8e8ed;
    border-radius: 10px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #7776e2;
    box-shadow: 0 0 0 4px rgba(119,118,226,0.1);
  }

  .input-with-icon {
    position: relative;
  }

  .input-with-icon input {
    width: 100%;
    padding: 0.85rem 3rem 0.85rem 1rem;
    border: 2px solid #e8e8ed;
    border-radius: 10px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .input-with-icon input:focus {
    outline: none;
    border-color: #7776e2;
    box-shadow: 0 0 0 4px rgba(119,118,226,0.1);
  }

  .eye-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #aaa;
    display: flex;
    align-items: center;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
  }

  .btn-primary {
    background: #7776e2;
    color: white;
  }

  .btn-primary:hover:not(:disabled) { background: #6665d2; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-primary.btn-saved { background: #059669; opacity: 1; cursor: default; }

  .btn-danger {
    background: #fee2e2;
    color: #dc2626;
  }

  .btn-danger:hover { background: #fecaca; }

  .btn-ghost {
    background: white;
    color: #555;
    border: 2px solid #e2e2ea;
    padding: 0.65rem 0.9rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .btn-ghost:hover { background: #f0f0f7; border-color: #bbb; color: #333; }

  .btn-full { width: 100%; justify-content: center; }

  .alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    border-radius: 10px;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }

  .alert-error { background: #fee2e2; color: #dc2626; }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  .btn-ghost .spinner,
  .loading-row .spinner {
    border-color: rgba(0,0,0,0.15);
    border-top-color: #7776e2;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #888;
    padding: 2rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem 2rem;
    color: #ccc;
  }

  .empty-state p { font-size: 1rem; color: #aaa; }

  /* ── Stats pills ── */
  .stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid #e8e8ed;
    background: white;
    color: #666;
    transition: all 0.15s;
  }

  .stat-pill span {
    background: #f0f0f5;
    color: #888;
    font-size: 0.72rem;
    padding: 0.1rem 0.45rem;
    border-radius: 10px;
    font-weight: 700;
  }

  .stat-pill:hover { border-color: #bbb; color: #333; }

  .stat-pill.active {
    background: color-mix(in srgb, var(--sc, #7776e2) 12%, white);
    border-color: var(--sc, #7776e2);
    color: var(--sc, #7776e2);
  }

  .stat-pill.active span {
    background: var(--sc, #7776e2);
    color: white;
  }

  /* ── Export button ── */
  .btn-export {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.1rem;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid #7776e2;
    background: rgba(119,118,226,0.07);
    color: #7776e2;
    transition: all 0.15s;
    white-space: nowrap;
  }

  .btn-export:hover { background: rgba(119,118,226,0.14); }

  /* ── Multi-select list ── */
  .list-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem 0.5rem 0.6rem;
    font-size: 0.8rem;
    color: #888;
    border-bottom: 1px solid #e2e2ea;
    margin-bottom: 0.5rem;
  }

  .checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
  }

  .checkbox-wrap input,
  .row-checkbox input {
    width: 15px;
    height: 15px;
    cursor: pointer;
    accent-color: #7776e2;
  }

  .sel-count {
    margin-left: auto;
    color: #7776e2;
    font-weight: 600;
  }

  .contact-row-wrap {
    display: flex;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #e8e8ed;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .contact-row-wrap:hover {
    border-color: #7776e2;
    box-shadow: 0 2px 8px rgba(119,118,226,0.12);
  }

  .contact-row-wrap.checked {
    border-color: #7776e2;
    background: rgba(119,118,226,0.04);
  }

  .row-checkbox {
    padding: 0 0.25rem 0 0.9rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .contact-row-wrap .contact-row {
    flex: 1;
    border: none;
    background: transparent;
    border-radius: 0 10px 10px 0;
    box-shadow: none;
  }

  .contact-row-wrap .contact-row:hover {
    border-color: transparent;
    box-shadow: none;
  }

  /* ── API Doc Accordion ── */
  .doc-accordion {
    margin-top: 1rem;
    border-top: 1px solid #e8e8ed;
    padding-top: 0.75rem;
  }

  .doc-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    color: #7776e2;
    padding: 0;
    width: 100%;
    text-align: left;
  }

  .doc-toggle span { flex: 1; }
  .doc-toggle:hover { color: #6665d2; }

  .doc-body {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .doc-intro {
    font-size: 0.8rem;
    color: #666;
    line-height: 1.6;
    margin: 0;
    padding: 0.75rem;
    background: #f8f8fc;
    border-radius: 8px;
    border-left: 3px solid #7776e2;
  }

  .doc-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .doc-section-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    margin: 0;
  }

  .doc-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .doc-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem 0.75rem;
    border-radius: 8px;
    border: 1px solid #e8e8ed;
    background: white;
  }

  .doc-item p {
    font-size: 0.78rem;
    color: #777;
    margin: 0;
    line-height: 1.5;
  }

  .doc-item--events { border-left: 3px solid #10b981; }
  .doc-item--triggers { border-left: 3px solid #f59e0b; }
  .doc-item--tags { border-left: 3px solid #3b82f6; }

  .doc-event-name {
    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    font-weight: 700;
    color: #1a1a2e;
    background: none;
    padding: 0;
  }

  .doc-item--events .doc-event-name { color: #059669; }
  .doc-item--triggers .doc-event-name { color: #d97706; }
  .doc-item--tags .doc-event-name { color: #2563eb; }

  .doc-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid #e8e8ed;
    flex-wrap: wrap;
  }

  .doc-link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #7776e2;
    text-decoration: none;
  }

  .doc-link:hover { text-decoration: underline; }

  .btn-doc-download {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: #666;
    background: #f5f5f7;
    border: 1px solid #e8e8ed;
    border-radius: 6px;
    padding: 0.3rem 0.65rem;
    cursor: pointer;
    margin-left: auto;
    transition: all 0.15s;
  }

  .btn-doc-download:hover { background: #ebebf0; color: #333; }

  /* ── Card badges ── */
  .card-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    white-space: nowrap;
    margin-left: auto;
    flex-shrink: 0;
  }

  .card-badge--ok {
    background: #ecfdf5;
    color: #059669;
  }

  .card-badge--empty {
    background: #f5f5f7;
    color: #999;
  }

  /* ── Input validation ── */
  .input-validated {
    position: relative;
  }

  .input-validated .api-input {
    padding-right: 2.5rem;
  }

  .input-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }

  .input-icon--ok { color: #059669; }
  .input-icon--err { color: #dc2626; }

  .api-input.input-ok {
    border-color: #a7f3d0;
    background: #f0fdf4;
  }

  .api-input.input-ok:focus {
    border-color: #059669;
    box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.1);
  }

  .api-input.input-err {
    border-color: #fecaca;
    background: #fef2f2;
  }

  .api-input.input-err:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
  }

  .input-hint {
    font-size: 0.75rem;
    margin: 0.35rem 0 0;
    padding: 0;
  }

  .input-hint--err {
    color: #dc2626;
  }

  /* ── Warn alert ── */
  .alert-warn {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  /* ── Dirty state ── */
  .dirty-label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #f59e0b;
    animation: pulse-dirty 2s ease-in-out infinite;
  }

  @keyframes pulse-dirty {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .admin-main { padding: 1.5rem 1rem; }
    .contacts-layout.split { grid-template-columns: 1fr; }
    .btn-export span { display: none; }
  }
</style>
