<script>
  import { onMount } from 'svelte';
  import Reveal from '../lib/Reveal.svelte';
  import { CheckCircle2, Plus, Minus } from 'lucide-svelte';
  import Contact from '../lib/Contact.svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

  const packages = [
    {
      name: "Audit & Strategy",
      tagline: "Know where you stand and where to go next.",
      billing: "One-time project",
      price: "€200",
      priceNote: "(from €400 regular fee)",
      description: "Perfect for businesses that need clarity before investing in paid media.",
      includes: [
        "In depth ad account audit (2 platforms)",
        "Competitor Analysis & Market Research (2 competitors)",
        "Personalized media plan with specific channel recommendations",
        "Budget allocation strategy (3 month planning)",
        "Technical tracking review (GTM, Pixel and Google Conversion Tracking)",
        "1-hour call with actionable insights and strategic overview",
        "Report in PDF for you to keep."
      ],
      bonus: "50% of the audit fee cost will be deducted if you proceed with implementation.",
      delivery: "Delivered within 3 working days",
      cta: "Get your audit today!",
      highlight: false
    },
    {
      name: "Full Management",
      badge: "Best Offer",
      tagline: "Your dedicated in-house paid media expert",
      billing: "Fixed Monthly Fee*",
      price: "From €985",
      priceNote: "(from €1.250)",
      description: "End-to-end campaign management. You focus on your core business, I handle the growth.",
      includes: [
        "Full Account Management & Optimization (2 platforms)",
        "Results oriented setup",
        "Weekly Performance Review with dedicated Report tailored to your Business",
        "A/B testing strategy for Creatives, Audiences and Bidding",
        "Ad Creative guidance & performance recommendations",
        "Direct communications (dedicated Slack Channel)",
        "3-months commitment"
      ],
      note: "Perfect for scale-ups and startups looking to grow sustainably. No retainer fee on budgets under $3.500 USD or €3.000 EUR.",
      cta: "Let's grow together",
      highlight: true
    },
    {
      name: "Campaign Launch",
      tagline: "Professional setup built to scale",
      billing: "One-time or Project based",
      price: "€650",
      priceNote: "(Project Delivered)",
      description: "For businesses ready to launch or rebuild their paid campaign the right way. Weekly engagement.",
      includes: [
        "Full campaign architecture (1 platform)",
        "Conversion Tracking Setup (GA4, Meta Pixel or Google Conversion Tracking)",
        "Landing Page Optimization Recommendations and Best Practices",
        "A/B testing framework",
        "2 Weeks Management after Campaigns are launched.",
        "Possibility to increase the duration of the management for an extra weekly fee (+€150/week)",
        "Campaign reporting and written handover documentation."
      ],
      note: "Perfect for startups and businesses with specific goals (promotions, product launch, smoke tests, business validation). No retainer fees for budgets under €2.000/month or $2.500 USD.",
      cta: "Launch your new campaigns now",
      highlight: false
    }
  ];

  const faqs = [
    {
      question: "Which platforms do you work with?",
      answer: `
        <p>I work with almost every self-service paid media platform and the essential marketing technology stack required for robust management. We choose the right platforms for your specific objectives, but my experience includes:</p>
        <ul class="faq-list">
          <li><strong>Core Paid Media Channels</strong></li>
          <li><strong>Search & Display:</strong> Google Ads, Bing Ads</li>
          <li><strong>Social & Video:</strong> Meta Ads (Facebook/Instagram), TikTok Ads, LinkedIn Ads, X (formerly Twitter), Pinterest, Reddit</li>
          <li><strong>E-commerce:</strong> Amazon Ads</li>
        </ul>
      `
    },
    {
      question: "What industries do you specialize in?",
      answer: `
        <p>I’ve worked in multiple industries from retail to high-growth DTC (Direct-to-Consumer), B2C, and B2B brands. My experience is broad, covering everything from:</p>
        <ul class="faq-list">
          <li>B2B & Lead Generation (For professional services and companies focused on acquiring qualified leads)</li>
          <li>Fashion & Apparel</li>
          <li>Beauty & Wellness</li>
          <li>Energy & Automotive</li>
          <li>Sporting Goods & Supplements</li>
          <li>Specialty E-commerce</li>
        </ul>
      `
    },
    {
      question: "Do you work with small budgets?",
      answer: "<p>I support businesses from the ground up and have structured my services to ensure high-level expertise is accessible even with smaller advertising budgets.</p>"
    },
    {
      question: "How quickly can we start?",
      answer: `
        <p>The short answer is: The process is rapid and client-driven. We can move from agreement to action in approximately one week, once the necessary onboarding steps are finalized:</p>
        <ul class="faq-list">
          <li><strong>Formal Agreement:</strong> The initial step is agreeing on the collaboration terms and the prompt sign-off of a flexible service contract.</li>
          <li><strong>Platform Access:</strong> Immediate access is required to your key marketing ecosystem. This typically includes your advertising accounts (e.g., Google Ads, Meta Ads), your analytics platforms (e.g., Google Analytics, Looker Studio), and your business manager/asset accounts to ensure proper tracking and campaign setup.</li>
          <li><strong>Project Kick-off:</strong> Once the contract is signed and all platform access is secured, the standard timeframe is approximately one week to complete the initial setup, a final tracking review, and begin the Audit or launch the first high-performance campaigns.</li>
        </ul>
      `
    }
  ];

  let activeFaq = null;
  function toggleFaq(index) {
    activeFaq = activeFaq === index ? null : index;
  }
</script>

<section class="services-page">
  <div class="container">
    <!-- Hero -->
    <Reveal>
      <div class="page-hero">
        <h1>Services</h1>
        <p class="subtitle">Whether you need a one-time audit or full campaign management, I offer flexible solutions tailored to where you are in your growth journey.</p>
      </div>
    </Reveal>

    <!-- Packages Grid -->
    <div class="packages-grid">
      {#each packages as pkg, i}
        <Reveal delay={i * 150}>
          <div class="package-card" class:highlight={pkg.highlight}>
            {#if pkg.badge || pkg.highlight}
              <span class="badge">{pkg.badge || 'Growth On-Demand'}</span>
            {/if}
            
            <div class="package-header">
              <h2>{pkg.name}</h2>
              <p class="tagline">{pkg.tagline}</p>
              {#if pkg.billing}
                <span class="billing-label">{pkg.billing}</span>
              {/if}
              <div class="price-wrap">
                <span class="price">{pkg.price}</span>
                {#if pkg.priceNote}
                  <span class="price-note">{pkg.priceNote}</span>
                {/if}
              </div>
            </div>

            <p class="description">{pkg.description}</p>

            <div class="includes">
              <h3>What's included:</h3>
              <ul>
                {#each pkg.includes as item}
                  <li>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </li>
                {/each}
              </ul>
            </div>

            {#if pkg.note}
              <p class="note">{pkg.note}</p>
            {/if}

            {#if pkg.bonus}
              <p class="bonus-note">🎁 {pkg.bonus}</p>
            {/if}

            {#if pkg.delivery}
              <p class="delivery-time">⏰ {pkg.delivery}</p>
            {/if}

            <a href="#/book-a-call" class="cta-button" class:primary={pkg.highlight}>
              {pkg.cta}
            </a>
          </div>
        </Reveal>
      {/each}
    </div>

    <!-- Additional Info -->
    <Reveal>
      <div class="info-section">
        <h2>Not sure which option fits?</h2>
        <p>Book a free 30-minute strategy call.<br>No pitch, just clarity on your next steps.</p>
        <a href="#/book-a-call" class="btn-secondary">Let's Talk</a>
      </div>
    </Reveal>

    <!-- Extra Services -->
    <Reveal>
      <div class="extras-section">
        <div class="extras-header">
          <h2>Extra services</h2>
          <p>Custom offer based on your specific needs. Request a free quote during our 30 minute call.</p>
        </div>

        <div class="extras-detailed-grid">
          <div class="extra-category">
            <h3>Creative Performance Services</h3>
            <ul>
              <li>UGC content</li>
              <li>Canva Edition</li>
              <li>Creative Support</li>
            </ul>
          </div>
          
          <div class="extra-category">
            <h3>Website and Landing Page Development</h3>
            <ul>
              <li>Test Landing Pages built to perform</li>
              <li>Improve your Conversion Rate</li>
              <li>Create a custom website from scratch</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>

    <!-- FAQ Mini -->
    <Reveal>
      <div class="faq-mini">
        <h3>Common Questions</h3>
        <div class="faq-accordion">
          {#each faqs as faq, i}
            <div class="faq-item" class:active={activeFaq === i}>
              <button class="faq-question" on:click={() => toggleFaq(i)}>
                <h4>{faq.question}</h4>
                <span class="icon">
                  {#if activeFaq === i}
                    <Minus size={20} />
                  {:else}
                    <Plus size={20} />
                  {/if}
                </span>
              </button>
              {#if activeFaq === i}
                <div class="faq-answer">
                  <div class="answer-content">
                    {@html faq.answer}
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </Reveal>
  </div>
</section>

<Contact />

<style>
  .services-page {
    padding: 8rem 0 4rem;
    background-color: var(--bg-color);
    min-height: 100vh;
  }

  /* Hero */
  .page-hero {
    text-align: center;
    margin-bottom: 5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .page-hero h1 {
    font-size: 3.5rem;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .page-hero .subtitle {
    font-size: 1.25rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* Packages Grid */
  .packages-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 5rem;
    align-items: stretch;
  }

  /* Reveal wrapper is the grid cell: fill row height so cards align */
  .packages-grid > :global(.reveal) {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
  }

  .package-card {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    border: 2px solid rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    width: 100%;
    min-height: 0;
  }

  .package-card:hover {
    border-color: var(--accent-color);
    box-shadow: 0 12px 48px rgba(119, 118, 226, 0.15);
    transform: translateY(-8px);
  }

  .package-card.highlight {
    border-color: var(--accent-color);
    border-width: 3px;
    box-shadow: 0 12px 40px rgba(119, 118, 226, 0.24);
    z-index: 2;
  }

  .badge {
    position: absolute;
    top: -12px;
    right: 20px;
    background: var(--accent-color);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .package-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  }

  .package-header h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .tagline {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
    display: block;
  }

  .price {
    display: inline-block;
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent-color);
    background: var(--accent-light);
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  .description {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .price-wrap {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .billing-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .price-note {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .bonus-note, .delivery-time {
    font-size: 0.9rem;
    color: var(--text-color);
    background: #f8f8ff;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px dashed var(--accent-color);
  }

  .delivery-time {
    background: #fff;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0,0,0,0.05);
  }

  .includes h3 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .includes ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  .includes li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .includes li :global(svg) {
    color: var(--accent-color);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .note {
    font-size: 0.85rem;
    color: var(--accent-muted);
    font-style: italic;
    background: rgba(119, 118, 226, 0.05);
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .cta-button {
    display: block;
    text-align: center;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: auto;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    background: transparent;
  }

  .cta-button:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }

  .cta-button.primary {
    background: var(--accent-color);
    color: white;
  }

  .cta-button.primary:hover {
    background: #6665d2;
    box-shadow: 0 8px 24px rgba(119, 118, 226, 0.4);
  }

  /* Info Section */
  .info-section {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(119, 118, 226, 0.06) 0%, rgba(119, 118, 226, 0.02) 100%);
    border-radius: 20px;
    margin-bottom: 4rem;
  }

  .info-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .info-section p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-secondary {
    display: inline-block;
    padding: 1rem 2rem;
    background: white;
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }

  /* FAQ Mini */
  .faq-mini {
    max-width: 800px;
    margin: 4rem auto;
  }

  .faq-mini h3 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .faq-item.active {
    border-color: var(--accent-color);
    box-shadow: 0 4px 24px rgba(119, 118, 226, 0.1);
  }

  .faq-question {
    width: 100%;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .faq-question h4 {
    margin: 0;
    font-size: 1.15rem;
    color: var(--text-color);
    font-weight: 600;
  }

  .faq-question .icon {
    color: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .faq-answer {
    padding: 0 2rem 1.5rem;
  }

  .answer-content {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .answer-content p {
    margin-bottom: 1rem;
  }

  :global(.faq-list) {
    padding-left: 1.2rem;
    margin-bottom: 1rem;
  }

  :global(.faq-list li) {
    margin-bottom: 0.75rem;
    position: relative;
  }

  .price-note {
    display: inline-block;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-left: 0.5rem;
    font-weight: 500;
  }

  /* Extras Section */
  .extras-section {
    margin-top: 6rem;
    padding: 4rem;
    background: white;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .extras-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .extras-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .extras-header p {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }

  .extras-detailed-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }

  .extra-category h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--accent-color);
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--accent-light);
  }

  .extra-category ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .extra-category li {
    font-size: 1.1rem;
    color: var(--text-color);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;
  }

  .extra-category li::before {
    content: "●";
    color: var(--accent-color);
    font-size: 0.8rem;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .packages-grid {
      grid-template-columns: 1fr;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 768px) {
    .services-page {
      padding: 6rem 0 3rem;
    }

    .page-hero h1 {
      font-size: 2.5rem;
    }

    .page-hero .subtitle {
      font-size: 1.1rem;
    }

    .package-card {
      padding: 2rem;
    }

    .faq-accordion {
      gap: 0.75rem;
    }

    .info-section {
      padding: 3rem 1.5rem;
    }

    .extras-section {
      padding: 2rem;
    }

    .extras-detailed-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .extras-header h2 {
      font-size: 2rem;
    }
  }
</style>
