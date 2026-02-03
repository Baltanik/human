<script>
  import { onMount } from 'svelte';
  import Reveal from '../lib/Reveal.svelte';
  import { CheckCircle2 } from 'lucide-svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

  const packages = [
    {
      name: "Audit & Strategy",
      tagline: "Know where you stand and where to go next",
      price: "One-time project",
      description: "Perfect for businesses that need clarity before investing in paid media.",
      includes: [
        "Complete ad account audit (Google, Meta, or both)",
        "Competitor analysis & market research",
        "Media plan with channel recommendations",
        "Budget allocation strategy",
        "Technical tracking review",
        "1-hour strategy call with detailed report"
      ],
      note: "Audit fee deducted if you proceed with implementation.",
      cta: "Get Your Audit",
      highlight: false
    },
    {
      name: "Campaign Launch",
      tagline: "Professional setup built to scale",
      price: "One-time or project-based",
      description: "For businesses ready to launch or rebuild their paid campaigns the right way.",
      includes: [
        "Full campaign architecture (Google/Meta/TikTok/LinkedIn)",
        "Conversion tracking setup (GA4, GTM, pixels)",
        "Landing page optimization recommendations",
        "A/B test framework implementation",
        "2 weeks of monitoring & initial optimizations",
        "Campaign handoff documentation"
      ],
      note: "Can be combined with ongoing management.",
      cta: "Launch Your Campaigns",
      highlight: true
    },
    {
      name: "Full Management",
      tagline: "Your in-house paid media team",
      price: "Monthly retainer",
      description: "End-to-end campaign management. You focus on your business, I handle the growth.",
      includes: [
        "Complete account management (all platforms)",
        "Weekly performance monitoring & optimization",
        "Monthly strategy calls + detailed reporting",
        "Ongoing A/B testing & CRO",
        "Ad creative guidance & recommendations",
        "Direct Slack/email access (24h response)"
      ],
      note: "Minimum 3-month commitment. Pricing based on ad spend.",
      cta: "Let's Talk",
      highlight: false
    }
  ];
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
            {#if pkg.highlight}
              <span class="badge">Most Popular</span>
            {/if}
            
            <div class="package-header">
              <h2>{pkg.name}</h2>
              <p class="tagline">{pkg.tagline}</p>
              <span class="price">{pkg.price}</span>
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
        <p>Book a free 30-minute call. I'll review your current setup, answer your questions, and recommend the best path forward—no pressure, no pitch.</p>
        <a href="#/book-a-call" class="btn-secondary">Book a Free Call</a>
      </div>
    </Reveal>

    <!-- FAQ Mini -->
    <Reveal>
      <div class="faq-mini">
        <h3>Common Questions</h3>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>What platforms do you work with?</h4>
            <p>Google Ads, Meta (Facebook/Instagram), TikTok, LinkedIn, and Microsoft Ads. I recommend the best fit based on your business.</p>
          </div>
          <div class="faq-item">
            <h4>Do you work with small budgets?</h4>
            <p>I typically work with businesses spending $3k+/month on ads. If you're just starting, the Audit & Strategy package is a great first step.</p>
          </div>
          <div class="faq-item">
            <h4>What industries do you specialize in?</h4>
            <p>I've worked with e-commerce, SaaS, lead generation, and local businesses. I focus on performance, not just specific verticals.</p>
          </div>
          <div class="faq-item">
            <h4>How quickly can we start?</h4>
            <p>Depending on availability, typically within 1-2 weeks for audits and 2-3 weeks for full campaign launches.</p>
          </div>
        </div>
      </div>
    </Reveal>
  </div>
</section>

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
  }

  .package-card:hover {
    border-color: var(--accent-color);
    box-shadow: 0 12px 48px rgba(119, 118, 226, 0.15);
    transform: translateY(-8px);
  }

  .package-card.highlight {
    border-color: var(--accent-color);
    border-width: 3px;
    box-shadow: 0 8px 32px rgba(119, 118, 226, 0.2);
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
    color: var(--accent-color);
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
    max-width: 1000px;
    margin: 0 auto;
  }

  .faq-mini h3 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .faq-item {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .faq-item h4 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .faq-item p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
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

    .faq-grid {
      grid-template-columns: 1fr;
    }

    .info-section {
      padding: 3rem 1.5rem;
    }
  }
</style>
