<script>
  import { onMount } from 'svelte';
  import Reveal from '../lib/Reveal.svelte';
  import Contact from '../lib/Contact.svelte';

  let sectionEl;
  let scrollProgress = 0; // 0 = top (white), 1 = bottom of section (raw)
  /** Maps scroll so purple ramps in faster than linear */
  const PURPLE_RAMP = 2.4;

  onMount(() => {
    window.scrollTo(0, 0);

    function updateProgress() {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const sectionH = sectionEl.offsetHeight;
      const viewH = window.innerHeight;
      // How far we've scrolled INTO the section: 0 at top, 1 at bottom
      const scrolled = -rect.top;
      const max = sectionH - viewH;
      scrollProgress = Math.min(1, Math.max(0, scrolled / Math.max(max, 1)));
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  });

  // Interpolate between two hex colors by t (0→1)
  function lerp(a, b, t) {
    const ah = parseInt(a.replace('#',''), 16);
    const bh = parseInt(b.replace('#',''), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const blue = Math.round(ab + (bb - ab) * t);
    return `rgb(${r},${g},${blue})`;
  }

  // The gradient background: white at top → purple #7776E2 at bottom
  $: purpleT = Math.min(1, scrollProgress * PURPLE_RAMP);
  $: bgStyle = (() => {
    const t = purpleT;
    const WHITE  = '#ffffff';
    const PURPLE = '#7776E2';
    const endColor = lerp(WHITE, PURPLE, t);
    const midColor = lerp(WHITE, PURPLE, t * 0.55);
    return `background: linear-gradient(to bottom, ${WHITE} 0%, ${midColor} 32%, ${endColor} 88%)`;
  })();

  // Text adapts once background is sufficiently purple (uses same ramp as bg)
  $: isDark = purpleT > 0.55;

  const principles = [
    {
      number: '01',
      title: "No overcomplicated reporting",
      description: "Clear metrics tied to revenue. I focus on what actually moves the needle of your business — no vanity metrics, no fluff."
    },
    {
      number: '02',
      title: "Transparent Pricing",
      description: "Fixed monthly fees or project-based agreements. No hidden costs, no long-term lock-in contracts."
    },
    {
      number: '03',
      title: "Lean Communication",
      description: "Direct contact with your account manager, reachable during working hours. No time wasted on infinite email chains."
    },
    {
      number: '04',
      title: "Partnership, not vendor",
      description: "I only work with businesses I believe in. Your success is my success — we are in this together."
    }
  ];

  /** Asset: `public/loghi-clients/*.webp` (sorgenti in `public/loghi clients/`) */
  const featuredClients = [
    { name: 'Enel', logoSrc: '/loghi-clients/enel.webp' },
    { name: 'AC Milan', logoSrc: '/loghi-clients/ac-milan.webp' },
    { name: 'Crocs', logoSrc: '/loghi-clients/crocs.webp' },
    { name: 'Formula E', logoSrc: '/loghi-clients/formula-e.webp' },
    { name: 'Treatwell', logoSrc: '/loghi-clients/treatwell.webp' },
    { name: 'Cazoo', logoSrc: '/loghi-clients/cazoo.webp' }
  ];

  const otherClients = [
    'Cotopaxi', 'Medik8', 'HiNelson', 'Truly Venice',
    'Farmaé', 'Gianluca Mech', 'Masoni Online', 'TaniniHome',
    'Hurry!', 'Rodelag', 'Luna de Oriente', 'Poin Panamá', 'RI Group', 'Aquatics'
  ];

  const certifications = [
    {
      name: 'Google Search Ads',
      issuer: 'Google',
      color: '#4285F4',
      icon: 'google'
    },
    {
      name: 'Google Display Ads',
      issuer: 'Google',
      color: '#4285F4',
      icon: 'google'
    },
    {
      name: 'Google Shopping',
      issuer: 'Google',
      color: '#4285F4',
      icon: 'google'
    },
    {
      name: 'Advanced Analytics',
      issuer: 'Google',
      color: '#4285F4',
      icon: 'google'
    },
    {
      name: 'Data Analytics',
      issuer: 'Coursera',
      color: '#0056D2',
      icon: 'coursera'
    }
  ];

  const expertise = [
    { platform: 'Google Ads', category: 'paid', icon: 'google' },
    { platform: 'Meta Ads', category: 'paid', icon: 'meta' },
    { platform: 'TikTok Ads', category: 'paid', icon: 'tiktok' },
    { platform: 'LinkedIn Ads', category: 'paid', icon: 'linkedin' },
    { platform: 'Bing Ads', category: 'paid', icon: 'bing' },
    { platform: 'Criteo', category: 'paid', icon: 'criteo' },
    { platform: 'Google Analytics', category: 'analytics', icon: 'google-analytics' },
    { platform: 'Looker Studio', category: 'analytics', icon: 'looker' },
    { platform: 'TripleWhale', category: 'analytics', icon: 'triplewhale' },
    { platform: 'Shopify', category: 'tech', icon: 'shopify' },
    { platform: 'HubSpot', category: 'tech', icon: 'hubspot' }
  ];
</script>

<section
  id="about"
  class="about-page"
  class:is-dark={isDark}
  style={bgStyle}
  bind:this={sectionEl}
>
  <div class="container">

    <!-- ─── HERO ─── -->
    <Reveal>
      <div class="page-hero">
        <div class="hero-photo">
          <img src="/1614590410625.jpeg" alt="Arturo Bueno" />
        </div>
        <div class="hero-text">
          <span class="eyebrow">Founder & Paid Media Strategist</span>
          <h1>Arturo Bueno</h1>
          <p class="tagline">After a decade at top digital marketing agencies managing six-figure monthly budgets, I founded Human Marketing to give small and medium-sized businesses direct access to senior-level paid media expertise — without the agency overhead.</p>
          <div class="hero-meta">
            <span class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Europe (working worldwide)
            </span>
            <span class="meta-dot">·</span>
            <span class="meta-item">EN · ES · IT · PT</span>
          </div>
        </div>
      </div>
    </Reveal>

    <!-- ─── THE STORY ─── -->
    <Reveal>
      <div class="story-section">
        <div class="story-label">
          <span class="eyebrow">The Story</span>
        </div>
        <div class="story-body">
          <blockquote class="story-pull">
            "Great businesses shouldn't need a full agency to get senior-level expertise."
          </blockquote>
          <div class="story-paragraphs">
            <p>After a decade working with major marketing agencies managing multi-million dollar campaigns, I saw a pattern: the clients who needed the most strategic attention were often handed off to junior staff while senior talent moved on to larger accounts.</p>
            <p>I founded Human to break that model. You get direct access to someone who's managed campaigns at scale, knows every platform inside out, and treats your budget like it's their own. <strong>No account managers playing telephone. No juniors learning on your dime.</strong></p>
            <p>One partner. Full focus. Results you can trace back to revenue.</p>
          </div>
        </div>
      </div>
    </Reveal>

    <!-- ─── CLIENTS ─── -->
    <div class="section clients-section">
      <div class="clients-panel">
        <Reveal>
          <div class="section-header clients-section-header">
            <span class="eyebrow">Track Record</span>
            <h2>Clients I've Worked With</h2>
            <p class="section-desc">Experience across energy, motorsport, fashion, beauty, and e-commerce.</p>
          </div>
        </Reveal>

        <div class="featured-clients">
          {#each featuredClients as client, i}
            <Reveal delay={i * 60}>
              <div class="featured-client-card">
                <div class="client-logo-wrap">
                  <img
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    class="client-logo-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          {/each}
        </div>

        <Reveal delay={200}>
          <div class="other-clients-wrap">
            <p class="other-clients-label">And many more</p>
            <div class="other-clients">
              {#each otherClients as name}
                <span class="client-pill">{name}</span>
              {/each}
            </div>
          </div>
        </Reveal>
      </div>
    </div>

    <!-- ─── CERTIFICATIONS ─── -->
    <div class="section certifications-section">
      <Reveal>
        <div class="section-header">
          <span class="eyebrow">Credentials</span>
          <h2>Certifications & Awards</h2>
        </div>
      </Reveal>

      <div class="credentials-split">
        <Reveal delay={80}>
          <aside class="award-spotlight" aria-label="Featured award">
            <div class="award-spotlight-glow" aria-hidden="true"></div>
            <div class="award-spotlight-star" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFD700" stroke="#E6A800" stroke-width="0.75"/>
              </svg>
            </div>
            <p class="award-spotlight-eyebrow">Google Award · Italy · 2019</p>
            <h3 class="award-spotlight-title">Performance Excellence Award</h3>
            <span class="award-spotlight-badge">Top 10 Italian Practitioners</span>
          </aside>
        </Reveal>

        <div class="cert-list-panel">
          <p class="cert-list-heading" id="cert-list-title">Platform certifications</p>
          <div class="cert-list" role="list" aria-labelledby="cert-list-title">
            {#each certifications as cert, i}
              <Reveal delay={i * 40 + 100}>
                <div class="cert-row" class:cert-row-divider={i > 0} role="listitem">
                  <div class="cert-row-icon" style="background: {cert.color}12; border-color: {cert.color}28;">
                    {#if cert.icon === 'google'}
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    {:else}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="{cert.color}" aria-hidden="true">
                        <path d="M11.601 1.677C6.024 1.677 1.5 6.2 1.5 11.776c0 4.147 2.496 7.72 6.1 9.3l3.498-9.573H8.86V9.924h5.555l-1.17 3.202h-1.19l-2.898 7.93c.6.11 1.21.17 1.844.17 5.577 0 10.1-4.523 10.1-10.1 0-5.576-4.523-10.1-10.1-10.1l.001-.249z"/>
                      </svg>
                    {/if}
                  </div>
                  <div class="cert-row-body">
                    <span class="cert-row-name">{cert.name}</span>
                    <span class="cert-row-issuer" style="color: {cert.color}">{cert.issuer}</span>
                  </div>
                  <svg class="cert-row-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
              </Reveal>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- ─── PLATFORM EXPERTISE ─── -->
    <div class="section expertise-section">
      <Reveal>
        <div class="section-header">
          <span class="eyebrow">Toolset</span>
          <h2>Platform Expertise</h2>
          <p class="section-desc">Every platform I recommend, I've managed at scale — with real budgets and real results.</p>
        </div>
      </Reveal>
      <div class="expertise-grid">
        {#each expertise as item, i}
          <Reveal delay={i * 40}>
            <div class="expertise-chip" data-category={item.category}>
              <span class="chip-dot" style="background: {item.category === 'paid' ? '#7776E2' : item.category === 'analytics' ? '#22c55e' : '#f59e0b'}"></span>
              {#if item.icon === 'google'}
                <svg width="15" height="15" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              {:else if item.icon === 'meta'}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" class="chip-icon" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              {:else if item.icon === 'tiktok'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="chip-icon" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              {:else if item.icon === 'linkedin'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="chip-icon" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              {:else if item.icon === 'bing'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#F25022" d="M0 0h11.408v11.408H0z"/>
                  <path fill="#7FBA00" d="M12.592 0H24v11.408H12.592z"/>
                  <path fill="#00A4EF" d="M0 12.592h11.408V24H0z"/>
                  <path fill="#FFB900" d="M12.592 12.592H24V24H12.592z"/>
                </svg>
              {:else if item.icon === 'criteo'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#F47321"/>
                  <path fill="#fff" d="M16.2 8.3c-1-.85-2.35-1.35-3.85-1.35-3.2 0-5.65 2.35-5.65 5.55s2.45 5.55 5.65 5.55c1.5 0 2.85-.5 3.85-1.35l-1.15-1.45c-.75.6-1.75.95-2.7.95-2.05 0-3.55-1.55-3.55-3.7s1.5-3.7 3.55-3.7c.95 0 1.95.35 2.7.95l1.15-1.45z"/>
                </svg>
              {:else if item.icon === 'google-analytics'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#F9AB00" d="M3 18h4V8H3v10zm7 0h4V6h-4v12zm7 0h4v-6h-4v6z"/>
                </svg>
              {:else if item.icon === 'looker'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#4285F4" d="M4 18h3.5V9H4v9zm5.25 0h3.5v-7h-3.5v7zm5.25 0H18V5h-3.5v13z"/>
                </svg>
              {:else if item.icon === 'triplewhale'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#0d9488" d="M4 17h3.5v-6H4v6zm5.25 0h3.5V7h-3.5v10zm5.25 0H18V4h-3.5v13z"/>
                </svg>
              {:else if item.icon === 'shopify'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#95BF47" d="M7 8V6a5 5 0 0 1 10 0v2h1v13H6V8h1zm2 0h6V6a3 3 0 0 0-6 0v2z"/>
                </svg>
              {:else if item.icon === 'hubspot'}
                <svg width="14" height="14" viewBox="0 0 24 24" class="chip-icon chip-icon-brand" aria-hidden="true">
                  <path fill="#ff7a59" d="M18.164 7.93V5.084a2.198 2.198 0 0 0-2.198-2.198h-.935a2.198 2.198 0 0 0-2.198 2.198v2.848a2.198 2.198 0 0 0 2.198 2.198h.305v1.688a1.203 1.203 0 0 0 2.406 0v-1.688h.305a2.198 2.198 0 0 0 2.198-2.198zM6.502 7.93V5.084a2.198 2.198 0 0 0-2.198-2.198H3.04a2.198 2.198 0 0 0-2.198 2.198V7.93a2.198 2.198 0 0 0 2.198 2.198h.305v3.753a1.203 1.203 0 0 0 2.406 0v-3.753h.305a2.198 2.198 0 0 0 2.198-2.198zm8.633 7.275a4.62 4.62 0 1 0-9.24 0 4.62 4.62 0 0 0 9.24 0z"/>
                </svg>
              {/if}
              {item.platform}
            </div>
          </Reveal>
        {/each}
      </div>
      <Reveal delay={300}>
        <div class="expertise-legend">
          <span><span class="legend-dot" style="background:#7776E2"></span>Paid Media</span>
          <span><span class="legend-dot" style="background:#22c55e"></span>Analytics</span>
          <span><span class="legend-dot" style="background:#f59e0b"></span>Tech / CRM</span>
        </div>
      </Reveal>
    </div>

    <!-- ─── HOW I WORK ─── -->
    <div class="section how-i-work-section">
      <div class="how-i-work-inner">
        <Reveal>
          <div class="section-header">
            <span class="eyebrow">My Principles</span>
            <h2>How I Work</h2>
            <p class="section-desc">These aren't values written on a wall — they're constraints I hold myself to on every engagement.</p>
          </div>
        </Reveal>
        <div class="how-grid">
          {#each principles as item, i}
            <Reveal delay={i * 80}>
              <div class="how-card">
                <span class="how-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          {/each}
        </div>
      </div>
    </div>

  </div>
</section>

<Contact />

<style>
  .about-page {
    padding: 8rem 0 5rem;
    min-height: 100vh;
    /* background injected via inline style from scroll progress */
  }

  .eyebrow {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent-color);
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 1rem;
    transition: color 0.4s ease;
  }

  .section {
    padding: 6rem 0;
    border-top: 1px solid rgba(0,0,0,0.08);
    transition: border-color 0.4s ease;
  }

  .is-dark .section {
    border-top-color: rgba(255,255,255,0.15);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-size: 2.8rem;
    letter-spacing: -0.04em;
    color: var(--text-color);
    margin-bottom: 0.75rem;
    transition: color 0.4s ease;
  }

  .is-dark .section-header h2 {
    color: #ffffff;
  }

  .section-desc {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    transition: color 0.4s ease;
  }

  .is-dark .section-desc {
    color: rgba(255,255,255,0.75);
  }

  .is-dark .eyebrow {
    color: rgba(255,255,255,0.6);
  }

  /* ── HERO ── */
  .page-hero {
    display: flex;
    align-items: center;
    gap: 4rem;
    max-width: 860px;
    margin: 0 auto 0;
    padding-bottom: 6rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    transition: border-color 0.4s ease;
  }

  .is-dark .page-hero {
    border-bottom-color: rgba(255,255,255,0.15);
  }

  .hero-photo {
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid var(--accent-light);
    box-shadow: 0 10px 50px rgba(119, 118, 226, 0.18);
    transition: border-color 0.4s ease;
  }

  .is-dark .hero-photo {
    border-color: rgba(255,255,255,0.25);
    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
  }

  .hero-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-text {
    flex: 1;
  }

  .hero-text h1 {
    font-size: 3.2rem;
    letter-spacing: -0.04em;
    color: var(--text-color);
    margin: 0.25rem 0 1rem;
    line-height: 1.1;
    transition: color 0.4s ease;
  }

  .is-dark .hero-text h1 {
    color: #ffffff;
  }

  .tagline {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    transition: color 0.4s ease;
  }

  .is-dark .tagline {
    color: rgba(255,255,255,0.75);
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 500;
    transition: color 0.4s ease;
  }

  .is-dark .meta-item {
    color: rgba(255,255,255,0.6);
  }

  .meta-item svg {
    opacity: 0.5;
  }

  .meta-dot {
    color: var(--text-muted);
    opacity: 0.4;
  }

  .hero-socials {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1.5px solid rgba(0,0,0,0.10);
    color: var(--text-muted);
    background: rgba(255,255,255,0.7);
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .social-link:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    background: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(119,118,226,0.18);
  }

  .is-dark .social-link {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.7);
  }

  .is-dark .social-link:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    color: #ffffff;
  }

  /* ── STORY ── */
  .story-section {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 5rem;
    align-items: start;
    padding: 6rem 0;
    border-top: 1px solid rgba(0,0,0,0.06);
    max-width: 960px;
    margin: 0 auto;
    transition: border-color 0.4s ease;
  }

  .is-dark .story-section {
    border-top-color: rgba(255,255,255,0.15);
  }

  .story-label {
    padding-top: 0.25rem;
  }

  .story-pull {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    line-height: 1.4;
    letter-spacing: -0.02em;
    border-left: 4px solid var(--accent-color);
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    font-style: normal;
    transition: color 0.4s ease, border-color 0.4s ease;
  }

  .is-dark .story-pull {
    color: #ffffff;
    border-left-color: rgba(255,255,255,0.5);
  }

  .story-paragraphs p {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 1.25rem;
    transition: color 0.4s ease;
  }

  .is-dark .story-paragraphs p {
    color: rgba(255,255,255,0.72);
  }

  .story-paragraphs p:last-child {
    margin-bottom: 0;
    font-weight: 600;
    color: var(--text-color);
    font-size: 1.1rem;
  }

  .is-dark .story-paragraphs p:last-child {
    color: #ffffff;
  }

  .story-paragraphs strong {
    color: var(--text-color);
    font-weight: 700;
    transition: color 0.4s ease;
  }

  .is-dark .story-paragraphs strong {
    color: #ffffff;
  }

  /* ── FEATURED CLIENTS ── */
  .clients-section {
    text-align: center;
  }

  /* Isola su bianco: nella fascia lavanda (is-dark) il testo bianco era illeggibile */
  .clients-panel {
    max-width: 920px;
    margin: 0 auto;
    padding: 3rem 2.25rem 3.25rem;
    background: #ffffff;
    border-radius: 28px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow:
      0 4px 24px rgba(80, 70, 160, 0.08),
      0 1px 0 rgba(255, 255, 255, 0.9) inset;
  }

  .clients-section-header {
    margin-bottom: 2.75rem;
  }

  .clients-panel .section-header h2,
  .is-dark .clients-panel .section-header h2 {
    color: #0a0a0a;
  }

  .clients-panel .section-desc,
  .is-dark .clients-panel .section-desc {
    color: #4a4a4a;
  }

  .clients-panel .eyebrow,
  .is-dark .clients-panel .eyebrow {
    color: var(--accent-color);
  }

  .featured-clients {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 860px;
    margin: 0 auto 3rem;
  }

  .featured-client-card {
    background: rgba(255,255,255,0.92);
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 16px;
    padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    transition: all 0.3s ease, background 0.4s ease, border-color 0.4s ease;
  }

  .is-dark .featured-client-card {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
  }

  .featured-client-card:hover {
    border-color: rgba(119, 118, 226, 0.4);
    box-shadow: 0 8px 32px rgba(119, 118, 226, 0.15);
    transform: translateY(-3px);
  }

  .is-dark .featured-client-card:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.4);
  }

  .clients-panel .featured-client-card,
  .is-dark .clients-panel .featured-client-card {
    background: #fafafa;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .clients-panel .featured-client-card:hover,
  .is-dark .clients-panel .featured-client-card:hover {
    background: #ffffff;
    border-color: rgba(119, 118, 226, 0.45);
    box-shadow: 0 8px 28px rgba(119, 118, 226, 0.18);
  }

  .client-logo-wrap {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .client-logo-wrap .client-logo-img {
    max-width: 100%;
    max-height: 56px;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
    opacity: 0.72;
    transition: opacity 0.3s ease;
  }

  .is-dark .client-logo-wrap .client-logo-img {
    opacity: 0.75;
  }

  .clients-panel .client-logo-wrap .client-logo-img,
  .is-dark .clients-panel .client-logo-wrap .client-logo-img {
    opacity: 0.8;
  }

  .clients-panel .featured-client-card:hover .client-logo-wrap .client-logo-img,
  .is-dark .clients-panel .featured-client-card:hover .client-logo-wrap .client-logo-img,
  .featured-client-card:hover .client-logo-wrap .client-logo-img {
    opacity: 1;
  }

  .other-clients-wrap {
    max-width: 860px;
    margin: 0 auto;
  }

  .other-clients-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 1.25rem;
    opacity: 0.6;
    transition: color 0.4s ease;
  }

  .is-dark .other-clients-label {
    color: rgba(255,255,255,0.6);
  }

  .clients-panel .other-clients-label,
  .is-dark .clients-panel .other-clients-label {
    color: #6b6b6b;
    opacity: 1;
  }

  .other-clients {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
  }

  .client-pill {
    padding: 0.45rem 1rem;
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 100px;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.2s ease, background 0.4s ease, border-color 0.4s ease, color 0.4s ease;
    cursor: default;
  }

  .is-dark .client-pill {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.75);
  }

  .client-pill:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    background: var(--accent-light);
  }

  .is-dark .client-pill:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    color: #ffffff;
  }

  .clients-panel .client-pill,
  .is-dark .clients-panel .client-pill {
    background: #f0f0f3;
    border-color: rgba(0, 0, 0, 0.1);
    color: #2d2d2d;
  }

  .clients-panel .client-pill:hover,
  .is-dark .clients-panel .client-pill:hover {
    background: var(--accent-light);
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  /* ── CERTIFICATIONS ── */
  .certifications-section {
    text-align: center;
  }

  .credentials-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 2rem;
    max-width: 980px;
    margin: 0 auto;
    align-items: stretch;
    text-align: left;
  }

  /* Sinistra: award hero */
  .award-spotlight {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2.5rem 2rem;
    border-radius: 24px;
    background: linear-gradient(145deg, #fff8e1 0%, #ffe9a8 42%, #ffd963 100%);
    border: 2px solid rgba(230, 168, 0, 0.35);
    box-shadow:
      0 20px 50px rgba(180, 130, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
    overflow: hidden;
    min-height: 100%;
  }

  .award-spotlight-glow {
    position: absolute;
    top: -40%;
    right: -30%;
    width: 70%;
    height: 90%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, transparent 65%);
    pointer-events: none;
  }

  .award-spotlight-star {
    position: relative;
    width: 76px;
    height: 76px;
    border-radius: 20px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    box-shadow: 0 8px 28px rgba(180, 120, 0, 0.22);
    flex-shrink: 0;
  }

  .award-spotlight-eyebrow {
    position: relative;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #9a5f00;
    margin: 0 0 0.75rem;
  }

  .award-spotlight-title {
    position: relative;
    font-size: clamp(1.5rem, 3.2vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: #1a1206;
    margin: 0 0 1.25rem;
    max-width: 16ch;
  }

  .award-spotlight-badge {
    position: relative;
    display: inline-block;
    font-size: 0.82rem;
    font-weight: 700;
    font-style: italic;
    color: #6b4200;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.72);
    border-radius: 100px;
    border: 1px solid rgba(180, 120, 0, 0.22);
  }

  /* Destra: lista certificazioni */
  .cert-list-panel {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 1.5rem 1.25rem 1.25rem;
    box-shadow: 0 12px 40px rgba(80, 70, 160, 0.07);
  }

  .cert-list-heading {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent-color);
    margin: 0 0 1rem 0.35rem;
  }

  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cert-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 0.75rem;
    border-radius: 14px;
    transition: background 0.2s ease;
  }

  .cert-row-divider {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .cert-row:hover {
    background: rgba(119, 118, 226, 0.06);
  }

  .cert-row-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cert-row-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
    min-width: 0;
  }

  .cert-row-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #0a0a0a;
    line-height: 1.25;
  }

  .cert-row-issuer {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .cert-row-check {
    flex-shrink: 0;
    opacity: 0.55;
  }

  .cert-row:hover .cert-row-check {
    opacity: 1;
  }

  .is-dark .award-spotlight {
    background: linear-gradient(145deg, #fff8e1 0%, #ffe9a8 42%, #ffd963 100%);
    border-color: rgba(230, 168, 0, 0.4);
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .is-dark .cert-list-panel {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  }

  .is-dark .cert-row-divider {
    border-top-color: rgba(0, 0, 0, 0.07);
  }

  /* ── EXPERTISE ── */
  .expertise-section {
    text-align: center;
  }

  .expertise-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    max-width: 760px;
    margin: 0 auto 2rem;
  }

  .expertise-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: #ffffff;
    border: 1.5px solid rgba(0,0,0,0.08);
    border-radius: 100px;
    font-size: 0.92rem;
    font-weight: 600;
    color: #050505;
    transition: all 0.25s ease;
    cursor: default;
  }

  .expertise-chip:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(119, 118, 226, 0.18);
  }

  .chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .chip-icon {
    flex-shrink: 0;
    opacity: 0.65;
    transition: opacity 0.25s ease;
  }

  .expertise-chip:hover .chip-icon {
    opacity: 1;
  }

  /* Brand SVGs use fixed fills — hover text color must not flatten them */
  .expertise-chip:hover .chip-icon-brand {
    color: inherit;
  }

  .expertise-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.75);
    font-weight: 500;
  }

  .expertise-legend span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .legend-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  /* ── HOW I WORK ── */
  .how-i-work-section {
    background: #ffffff;
    border-radius: 32px;
    border: none;
    margin: 4rem 0;
    padding: 0;
  }

  .how-i-work-inner {
    padding: 6rem 4rem;
  }

  .how-i-work-section .section-header {
    margin-bottom: 3.5rem;
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 860px;
    margin: 0 auto;
  }

  .how-card {
    background: #f0efff;
    padding: 2.5rem;
    border-radius: 20px;
    text-align: left;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .how-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-color), #a5a4f0);
  }

  .how-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(119, 118, 226, 0.12);
  }

  .how-number {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--accent-color);
    background: rgba(119, 118, 226, 0.12);
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  /* how-i-work testi sempre scuri — il box è bianco indipendentemente dallo scroll */
  .how-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #050505;
  }

  .how-card p {
    font-size: 0.97rem;
    line-height: 1.65;
    color: #666666;
    margin: 0;
  }

  .how-i-work-section .section-header h2 {
    color: #050505;
  }

  .how-i-work-section .section-desc {
    color: #666666;
  }

  .how-i-work-section .eyebrow {
    color: var(--accent-color);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .page-hero {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }

    .hero-meta {
      justify-content: center;
    }

    .story-section {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .story-label {
      text-align: center;
    }

    .story-pull {
      font-size: 1.25rem;
    }

    .featured-clients {
      grid-template-columns: repeat(2, 1fr);
    }

    .clients-panel {
      padding: 2.5rem 1.5rem;
      border-radius: 22px;
    }

    .credentials-split {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }

    .award-spotlight {
      min-height: auto;
      padding: 2rem 1.75rem;
    }

    .how-grid {
      grid-template-columns: 1fr;
    }

    .how-i-work-inner {
      padding: 4rem 2rem;
    }
  }

  @media (max-width: 560px) {
    .about-page {
      padding: 6rem 0 3rem;
    }

    .section-header h2 {
      font-size: 2.2rem;
    }

    .featured-clients {
      grid-template-columns: 1fr;
    }

    .expertise-grid {
      gap: 0.5rem;
    }

    .clients-panel {
      padding: 2rem 1.15rem;
      border-radius: 18px;
    }

  }
</style>
