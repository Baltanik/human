<script>
  import { onMount } from 'svelte';
  import { API_BASE } from '../stores/admin.js';
  import Reveal from '../lib/Reveal.svelte';
  import { 
    Target, 
    BarChart3, 
    Handshake,
    Check,
    Facebook,
    Search,
    Monitor,
    ShoppingCart,
    Youtube,
    Music2,
    Package,
    Linkedin,
    Image,
    HelpCircle,
    ChevronRight,
    ChevronLeft,
    User,
    TrendingUp,
    Calendar
  } from 'lucide-svelte';

  let calendlyUrl = '';

  onMount(async () => {
    window.scrollTo(0, 0);

    // Load Calendly URL from backend settings
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        calendlyUrl = data.calendly_url || '';
      }
    } catch {
      // non-blocking
    }

  });

  // Svelte action: called when the calendly div is mounted
  function calendlyEmbed(node, url) {
    function init() {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url,
          parentElement: node,
          prefill: {},
          utm: {}
        });
      }
    }

    // Load script if not already present, then init
    if (window.Calendly) {
      init();
    } else {
      const existing = document.getElementById('calendly-script');
      if (existing) {
        existing.addEventListener('load', init, { once: true });
      } else {
        const s = document.createElement('script');
        s.id = 'calendly-script';
        s.src = 'https://assets.calendly.com/assets/external/widget.js';
        s.async = true;
        s.addEventListener('load', init, { once: true });
        document.head.appendChild(s);
      }
    }

    // Also load Calendly CSS if not present
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    return {
      destroy() {
        node.innerHTML = '';
      }
    };
  }

  let currentStep = 1;
  const TOTAL_STEPS = 4;

  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
    budget: '',
    platforms: [],
    goals: ''
  };

  let isSubmitting = false;
  let submitSuccess = false;
  let submitError = '';
  let step1Error = '';
  let step2Error = '';
  let step3Error = '';
  let step4Error = '';

  const budgetOptions = [
    { value: '0-1000', label: '€0 - €1.000', description: 'Testing the waters' },
    { value: '1000-5000', label: '€1.000 - €5.000', description: 'Growing steadily' },
    { value: '5000-10000', label: '€5.000 - €10.000', description: 'Scaling up' },
    { value: '10000-25000', label: '€10.000 - €25.000', description: 'Serious growth' },
    { value: '25000+', label: '€25.000+', description: 'Enterprise level' }
  ];

  const platformOptions = [
    { value: 'facebook-instagram', label: 'Facebook / Instagram', icon: Facebook },
    { value: 'google-search', label: 'Google Search', icon: Search },
    { value: 'google-display', label: 'Google Display', icon: Monitor },
    { value: 'google-shopping', label: 'Google Shopping / PMAX', icon: ShoppingCart },
    { value: 'youtube', label: 'YouTube', icon: Youtube },
    { value: 'tiktok', label: 'TikTok', icon: Music2 },
    { value: 'amazon', label: 'Amazon Ads', icon: Package },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'pinterest', label: 'Pinterest', icon: Image },
    { value: 'unknown', label: "I don't know yet", icon: HelpCircle }
  ];

  const steps = [
    { number: 1, label: 'Your Info', icon: User },
    { number: 2, label: 'Budget', icon: TrendingUp },
    { number: 3, label: 'Platforms', icon: Monitor },
    { number: 4, label: 'Book Call', icon: Calendar }
  ];

  function togglePlatform(value) {
    if (formData.platforms.includes(value)) {
      formData.platforms = formData.platforms.filter(p => p !== value);
    } else {
      formData.platforms = [...formData.platforms, value];
    }
  }

  function validateStep1() {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      step1Error = 'Please fill in all required fields.';
      return false;
    }
    step1Error = '';
    return true;
  }

  function validateStep2() {
    if (!formData.budget) {
      step2Error = 'Please select your monthly ad budget.';
      return false;
    }
    step2Error = '';
    return true;
  }

  function validateStep3() {
    if (formData.platforms.length === 0) {
      step3Error = 'Please select at least one advertising platform.';
      return false;
    }
    step3Error = '';
    return true;
  }

  function goNext() {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep < TOTAL_STEPS) currentStep += 1;
  }

  function goBack() {
    if (currentStep > 1) currentStep -= 1;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep3()) return;

    isSubmitting = true;
    submitError = '';

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company,
          website: formData.website,
          budget: formData.budget,
          platforms: formData.platforms,
          goals: formData.goals
        })
      });
      if (!res.ok) throw new Error('Server error');
      submitSuccess = true;
    } catch {
      submitError = 'Something went wrong. Please try again or email us directly.';
    } finally {
      isSubmitting = false;
    }
  }

  $: isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.company;
  $: isStep2Valid = !!formData.budget;
  $: isStep3Valid = formData.platforms.length > 0;
</script>

<section class="book-call-page">
  <div class="container">
    {#if submitSuccess}
      <Reveal>
        <div class="success-state">
          <div class="success-icon">
            <Check size={48} strokeWidth={3} />
          </div>
          <h1>Thank you!</h1>
          <p>We've received your request and will get back to you within 24 hours.</p>
          <a href="#/" class="btn">Back to Home</a>
        </div>
      </Reveal>
    {:else}
      <div class="page-grid">
        <!-- Left side - Info -->
        <div class="info-side">
          <Reveal>
            <h1>Ready to improve your <span>digital marketing</span> strategy?</h1>
          </Reveal>
          <Reveal delay={100}>
            <p class="subtitle">Fill in the form and tell us more about your goals. We'll be happy to meet and jump into a quick video call.</p>
          </Reveal>
          
          <Reveal delay={200}>
            <div class="benefits">
              <div class="benefit">
                <div class="benefit-icon">
                  <Target size={24} strokeWidth={2} />
                </div>
                <div>
                  <strong>Free 30-min consultation</strong>
                  <p>No strings attached. Let's explore if we're a good fit.</p>
                </div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">
                  <BarChart3 size={24} strokeWidth={2} />
                </div>
                <div>
                  <strong>Get actionable insights</strong>
                  <p>We'll share quick wins you can implement right away.</p>
                </div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">
                  <Handshake size={24} strokeWidth={2} />
                </div>
                <div>
                  <strong>Meet your potential team</strong>
                  <p>Talk directly with the people who'll manage your account.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <!-- Right side - Wizard Form -->
        <div class="form-side">
          <Reveal delay={150}>
            <!-- Step indicator -->
            <div class="step-indicator">
              {#each steps as step}
                <div class="step-item" class:active={currentStep === step.number} class:completed={currentStep > step.number}>
                  <div class="step-circle">
                    {#if currentStep > step.number}
                      <Check size={16} strokeWidth={3} />
                    {:else}
                      <svelte:component this={step.icon} size={16} strokeWidth={2} />
                    {/if}
                  </div>
                  <span class="step-label">{step.label}</span>
                </div>
                {#if step.number < TOTAL_STEPS}
                  <div class="step-line" class:filled={currentStep > step.number}></div>
                {/if}
              {/each}
            </div>

            <form on:submit={handleSubmit}>

              <!-- STEP 1: Your Information + Your Business -->
              {#if currentStep === 1}
                <div class="step-content">
                  <div class="step-header">
                    <h2>About you</h2>
                    <p>Tell us a bit about yourself and your business.</p>
                  </div>

                  <div class="form-section">
                    <h3>Your Information</h3>
                    <div class="form-row">
                      <div class="form-group">
                        <label for="firstName">First Name <span class="required">*</span></label>
                        <input 
                          type="text" 
                          id="firstName" 
                          bind:value={formData.firstName}
                          placeholder="John"
                        />
                      </div>
                      <div class="form-group">
                        <label for="lastName">Last Name <span class="required">*</span></label>
                        <input 
                          type="text" 
                          id="lastName" 
                          bind:value={formData.lastName}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email">Email <span class="required">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        bind:value={formData.email}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div class="form-section">
                    <h3>Your Business</h3>
                    <div class="form-group">
                      <label for="company">Company Name or Social Handle <span class="required">*</span></label>
                      <input 
                        type="text" 
                        id="company" 
                        bind:value={formData.company}
                        placeholder="Acme Inc. or @yourhandle"
                      />
                    </div>
                    <div class="form-group">
                      <label for="website">Company Website</label>
                      <div class="input-prefix">
                        <span>https://</span>
                        <input 
                          type="text" 
                          id="website" 
                          bind:value={formData.website}
                          placeholder="www.yourcompany.com"
                        />
                      </div>
                    </div>
                  </div>

                  {#if step1Error}
                    <div class="error-message">{step1Error}</div>
                  {/if}

                  <div class="step-actions">
                    <button type="button" class="btn btn-next" on:click={goNext}>
                      Continue
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              {/if}

              <!-- STEP 2: Monthly Ad Budget -->
              {#if currentStep === 2}
                <div class="step-content">
                  <div class="step-header">
                    <h2>Monthly Ad Budget</h2>
                    <p>What's your average monthly paid media investment?</p>
                  </div>

                  <div class="budget-grid">
                    {#each budgetOptions as option}
                      <label class="budget-option" class:selected={formData.budget === option.value}>
                        <input 
                          type="radio" 
                          name="budget" 
                          value={option.value}
                          bind:group={formData.budget}
                        />
                        <div class="budget-content">
                          <span class="budget-label">{option.label}</span>
                          <span class="budget-desc">{option.description}</span>
                        </div>
                      </label>
                    {/each}
                  </div>

                  {#if step2Error}
                    <div class="error-message">{step2Error}</div>
                  {/if}

                  <div class="step-actions">
                    <button type="button" class="btn-back" on:click={goBack}>
                      <ChevronLeft size={18} strokeWidth={2.5} />
                      Back
                    </button>
                    <button type="button" class="btn btn-next" on:click={goNext}>
                      Continue
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              {/if}

              <!-- STEP 3: Advertising Platforms -->
              {#if currentStep === 3}
                <div class="step-content">
                  <div class="step-header">
                    <h2>Advertising Platforms</h2>
                    <p>Which platforms are you currently using or planning to use?</p>
                  </div>

                  <div class="platforms-grid">
                    {#each platformOptions as platform}
                      <label 
                        class="platform-option" 
                        class:selected={formData.platforms.includes(platform.value)}
                      >
                        <input 
                          type="checkbox" 
                          value={platform.value}
                          checked={formData.platforms.includes(platform.value)}
                          on:change={() => togglePlatform(platform.value)}
                        />
                        <div class="platform-icon">
                          <svelte:component this={platform.icon} size={20} strokeWidth={2} />
                        </div>
                        <span class="platform-label">{platform.label}</span>
                      </label>
                    {/each}
                  </div>

                  {#if step3Error}
                    <div class="error-message">{step3Error}</div>
                  {/if}

                  <div class="step-actions">
                    <button type="button" class="btn-back" on:click={goBack}>
                      <ChevronLeft size={18} strokeWidth={2.5} />
                      Back
                    </button>
                    <button type="button" class="btn btn-next" on:click={goNext}>
                      Continue
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              {/if}

              <!-- STEP 4: Book Your Call (Calendly embed) -->
              {#if currentStep === 4}
                <div class="step-content">
                  <div class="step-header">
                    <h2>Book Your Free Call</h2>
                    <p>Pick a date and time that works for you. 30 minutes, no strings attached.</p>
                  </div>

                  {#if calendlyUrl}
                    <div
                      use:calendlyEmbed={calendlyUrl + '?hide_event_type_details=1&hide_gdpr_banner=1'}
                      style="min-width:280px;height:660px;"
                    ></div>
                  {:else}
                    <div class="calendly-missing">
                      <Calendar size={32} />
                      <p>Calendario non ancora configurato.<br>Inserisci il link Calendly dal pannello admin.</p>
                    </div>
                  {/if}

                  {#if submitError}
                    <div class="error-message">{submitError}</div>
                  {/if}

                  <div class="step-actions">
                    <button type="button" class="btn-back" on:click={goBack}>
                      <ChevronLeft size={18} strokeWidth={2.5} />
                      Back
                    </button>
                    <button
                      type="submit"
                      class="btn btn-submit"
                      disabled={isSubmitting}
                    >
                      {#if isSubmitting}
                        <span class="spinner"></span>
                        Sending...
                      {:else}
                        Confirm Booking
                      {/if}
                    </button>
                  </div>

                  <p class="privacy-note">
                    By submitting, you agree to be contacted about our services. We respect your privacy.
                  </p>
                </div>
              {/if}

            </form>
          </Reveal>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .calendly-missing {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 2rem;
    background: #fafafa;
    border: 2px dashed #e0e0e0;
    border-radius: 16px;
    color: #aaa;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .calendly-missing p {
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: #bbb;
  }

  .book-call-page {
    padding: 8rem 0 4rem;
    background: linear-gradient(180deg, rgba(119, 118, 226, 0.03) 0%, var(--bg-color) 50%);
    min-height: 100vh;
  }

  .page-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    align-items: start;
  }

  /* Left Info Side */
  .info-side {
    position: sticky;
    top: 120px;
  }

  .info-side h1 {
    font-size: 3rem;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .info-side h1 span {
    color: var(--accent-color);
    background: linear-gradient(120deg, var(--accent-color), #a09fe6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 3rem;
  }

  .benefits {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .benefit {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .benefit-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(119, 118, 226, 0.1);
    color: var(--accent-color);
    flex-shrink: 0;
  }

  .benefit strong {
    display: block;
    font-size: 1rem;
    color: var(--text-color);
    margin-bottom: 0.25rem;
  }

  .benefit p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }

  /* Right Form Side */
  .form-side {
    background: white;
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.04);
  }

  /* Step Indicator */
  .step-indicator {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(0, 0, 0, 0.12);
    background: #fafafa;
    color: var(--text-muted);
    transition: all 0.3s ease;
  }

  .step-item.active .step-circle {
    border-color: var(--accent-color);
    background: var(--accent-color);
    color: white;
    box-shadow: 0 0 0 4px rgba(119, 118, 226, 0.15);
  }

  .step-item.completed .step-circle {
    border-color: var(--accent-color);
    background: var(--accent-color);
    color: white;
  }

  .step-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    transition: color 0.3s ease;
    white-space: nowrap;
  }

  .step-item.active .step-label,
  .step-item.completed .step-label {
    color: var(--accent-color);
  }

  .step-line {
    flex: 1;
    height: 2px;
    background: rgba(0, 0, 0, 0.08);
    margin: 0 0.5rem;
    margin-bottom: 1.4rem;
    transition: background 0.3s ease;
  }

  .step-line.filled {
    background: var(--accent-color);
  }

  /* Step Content */
  .step-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .step-header {
    margin-bottom: 0.5rem;
  }

  .step-header h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.4rem;
    letter-spacing: -0.02em;
  }

  .step-header p {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-section {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 1.5rem;
  }

  .form-section:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .form-section h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .section-hint {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
    margin-top: 0.25rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .required {
    color: var(--accent-color);
  }

  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.9rem 1rem;
    font-size: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    transition: all 0.2s ease;
    background: #fafafa;
    font-family: inherit;
    box-sizing: border-box;
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    background: white;
    box-shadow: 0 0 0 4px rgba(119, 118, 226, 0.1);
  }

  input::placeholder,
  textarea::placeholder {
    color: #aaa;
  }

  .input-prefix {
    display: flex;
    align-items: stretch;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    overflow: hidden;
    background: #fafafa;
    transition: all 0.2s ease;
  }

  .input-prefix:focus-within {
    border-color: var(--accent-color);
    background: white;
    box-shadow: 0 0 0 4px rgba(119, 118, 226, 0.1);
  }

  .input-prefix span {
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    background: rgba(0, 0, 0, 0.03);
    color: var(--text-muted);
    font-size: 0.9rem;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
  }

  .input-prefix input {
    border: none;
    border-radius: 0;
    background: transparent;
    padding-left: 0.75rem;
  }

  .input-prefix input:focus {
    box-shadow: none;
  }

  /* Budget Options */
  .budget-grid {
    display: grid;
    gap: 0.75rem;
  }

  .budget-option {
    display: flex;
    align-items: center;
    padding: 1rem 1.25rem;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #fafafa;
  }

  .budget-option:hover {
    border-color: rgba(119, 118, 226, 0.3);
    background: white;
  }

  .budget-option.selected {
    border-color: var(--accent-color);
    background: rgba(119, 118, 226, 0.05);
  }

  .budget-option input {
    display: none;
  }

  .budget-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .budget-label {
    font-weight: 600;
    color: var(--text-color);
  }

  .budget-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  /* Platform Options */
  .platforms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .platform-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1rem;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #fafafa;
  }

  .platform-option:hover {
    border-color: rgba(119, 118, 226, 0.3);
    background: white;
  }

  .platform-option.selected {
    border-color: var(--accent-color);
    background: rgba(119, 118, 226, 0.05);
  }

  .platform-option input {
    display: none;
  }

  .platform-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
  }

  .platform-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color);
  }

  /* Calendar embed */
  .calendar-embed {
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid rgba(0, 0, 0, 0.06);
    background: #fafafa;
  }

  /* Step Actions */
  .step-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .btn-next {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
  }

  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    background: #f5f5f5;
    border: 2px solid rgba(0, 0, 0, 0.1);
    color: #555;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    line-height: 1;
  }

  .btn-back:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: #222;
    background: #ebebeb;
  }

  /* Submit Button */
  .btn-submit {
    flex: 1;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .privacy-note {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-align: center;
    margin-top: 0.75rem;
  }

  .error-message {
    padding: 0.9rem 1rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    color: #dc2626;
    font-size: 0.875rem;
  }

  /* Success State */
  .success-state {
    text-align: center;
    padding: 6rem 2rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-color), #a09fe6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
  }

  .success-state h1 {
    font-size: 2.5rem;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .success-state p {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .page-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .info-side {
      position: static;
      text-align: center;
    }

    .info-side h1 {
      font-size: 2.5rem;
    }

    .benefits {
      max-width: 400px;
      margin: 0 auto;
      text-align: left;
    }
  }

  @media (max-width: 768px) {
    .book-call-page {
      padding: 6rem 0 3rem;
    }

    .info-side h1 {
      font-size: 2rem;
    }

    .form-side {
      padding: 2rem 1.5rem;
      border-radius: 20px;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .platforms-grid {
      grid-template-columns: 1fr;
    }

    .budget-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .step-label {
      display: none;
    }
  }
</style>
