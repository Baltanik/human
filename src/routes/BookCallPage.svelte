<script>
  import { onMount } from 'svelte';
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
    HelpCircle
  } from 'lucide-svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

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

  function togglePlatform(value) {
    if (formData.platforms.includes(value)) {
      formData.platforms = formData.platforms.filter(p => p !== value);
    } else {
      formData.platforms = [...formData.platforms, value];
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    isSubmitting = true;
    submitError = '';

    // Simulate form submission - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual form submission endpoint
      console.log('Form submitted:', formData);
      
      submitSuccess = true;
    } catch (error) {
      submitError = 'Something went wrong. Please try again or email us directly.';
    } finally {
      isSubmitting = false;
    }
  }

  $: isFormValid = formData.firstName && formData.lastName && formData.email && formData.company && formData.budget && formData.platforms.length > 0;
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

        <!-- Right side - Form -->
        <div class="form-side">
          <Reveal delay={150}>
            <form on:submit={handleSubmit}>
              <!-- Name Section -->
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
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name <span class="required">*</span></label>
                    <input 
                      type="text" 
                      id="lastName" 
                      bind:value={formData.lastName}
                      placeholder="Doe"
                      required
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
                    required
                  />
                </div>
              </div>

              <!-- Company Section -->
              <div class="form-section">
                <h3>Your Business</h3>
                <div class="form-group">
                  <label for="company">Company Name or Social Handle <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="company" 
                    bind:value={formData.company}
                    placeholder="Acme Inc. or @yourhandle"
                    required
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

              <!-- Budget Section -->
              <div class="form-section">
                <h3>Monthly Ad Budget <span class="required">*</span></h3>
                <p class="section-hint">What's your average monthly paid media investment?</p>
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
              </div>

              <!-- Platforms Section -->
              <div class="form-section">
                <h3>Advertising Platforms <span class="required">*</span></h3>
                <p class="section-hint">Which platforms are you currently using or planning to use?</p>
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
              </div>

              <!-- Goals Section -->
              <div class="form-section">
                <h3>Your Goals</h3>
                <p class="section-hint">Tell us about your business goals and how we could collaborate.</p>
                <div class="form-group">
                  <textarea 
                    id="goals" 
                    bind:value={formData.goals}
                    placeholder="We're looking to scale our e-commerce business and need help with..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              {#if submitError}
                <div class="error-message">
                  {submitError}
                </div>
              {/if}

              <button 
                type="submit" 
                class="btn btn-submit"
                disabled={!isFormValid || isSubmitting}
              >
                {#if isSubmitting}
                  <span class="spinner"></span>
                  Sending...
                {:else}
                  Book Your Free Call
                {/if}
              </button>

              <p class="privacy-note">
                By submitting, you agree to be contacted about our services. We respect your privacy.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
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

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-section {
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  .form-section:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }

  .form-section h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .section-hint {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
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

  /* Textarea */
  textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Submit Button */
  .btn-submit {
    width: 100%;
    padding: 1.1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 1rem;
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
    width: 20px;
    height: 20px;
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
    margin-top: 1rem;
  }

  .error-message {
    padding: 1rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    color: #dc2626;
    font-size: 0.9rem;
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
  }
</style>
