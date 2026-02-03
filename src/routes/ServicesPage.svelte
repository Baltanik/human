<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import Reveal from '../lib/Reveal.svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

  function handleContactClick(e) {
    e.preventDefault();
    push('/book-a-call');
  }

  let activeIndex = null;

  function toggle(index) {
    activeIndex = activeIndex === index ? null : index;
  }

  const services = [
    {
      title: "Account Audit",
      shortDesc: "Comprehensive review of your current campaigns and opportunities.",
      description: "The first step to unlocking opportunities is our account audit. We'll thoroughly review your current campaigns to pinpoint areas for improvement. This includes analyzing your website and suggesting technical adjustments to boost performance. We'll also examine successful competitors to learn from their strategies and identify potential advantages for you. You'll receive a clear and comprehensive report with all the key data and insights, giving you a complete picture of your current standing and how we plan to achieve your business goals. We'll present the audit findings in a dedicated one-hour video call.",
      note: "If you decide to move forward with implementation, the audit cost can be deducted from your first month's invoice.",
      image: "/account_audit.webp"
    },
    {
      title: "Media Planning",
      shortDesc: "Strategic channel selection and budget allocation.",
      description: "Paid Social or Paid Search? We're experts in both and will help you determine the best fit for your business. If you're using both, we'll provide clear, actionable advice on budget allocation and ensure you're following best practices. We can create a customized media plan and adjust your current budgets to maximize results. You'll receive a comprehensive strategy, presented in a one-on-one or group video call to ensure everyone understands and agrees on the next steps.",
      note: "Media Planning delivers a strategic PDF document to guide future implementation and does not include campaign setup itself.",
      image: "/media_planning.webp"
    },
    {
      title: "Campaign Setup",
      shortDesc: "Professional campaign architecture built for scale.",
      description: "Once we have a clear strategy and objectives, we'll translate that into a winning and scalable campaign setup. This crucial step ensures your Media Plan becomes a reality. We'll set up various campaigns and run A/B tests to identify the most effective campaign types for your goals. We'll create a new structure if needed and address any missed opportunities. Our campaigns will follow industry best practices and be specifically tailored for your business to achieve top-tier performance.",
      image: "/campaign_setup.webp"
    },
    {
      title: "Tracking & Analytics",
      shortDesc: "Pixel-perfect tracking and data collection setup.",
      description: "Tracking the right website events is essential for a successful digital marketing campaign. Without accurate data, we'd miss valuable insights into the customer journey and opportunities for improvement. Alongside campaign setup, we'll ensure the correct events are tracked on your website, including the Meta Pixel and Google Conversion Events – these should be in place before any ad spending begins. We'll guarantee your tracking is properly set up to gather clean and reliable data.",
      image: "/tracking_analytics.webp"
    },
    {
      title: "Data Analysis & Performance Optimization",
      shortDesc: "Data-driven insights and continuous improvement.",
      description: "We'll gather, refine, process, and analyze your data, turning it into clear, actionable insights for optimization. We don't rely on guesswork; we study the numbers to provide you with a data-driven strategy. We'll optimize your campaigns based on actual results, ensuring no opportunity is overlooked. You can trust us to manage your budget responsibly, as if it were our own, and we will always prioritize your business goals over platform-specific objectives.",
      image: "/data_analysis.webp"
    },
    {
      title: "Conversion Rate Optimization",
      shortDesc: "Maximize conversions through continuous testing.",
      description: "We'll establish a system for continuous improvement. Conversion Rate Optimization will focus on enhancing your website and campaigns using proven best practices. This will help improve the quality of your traffic while ensuring your visitors have the best possible landing page experience, making the path to conversion smooth and rewarding.",
      image: "/cro_wireframe.webp"
    },
    {
      title: "360° Digital Marketing Strategy",
      shortDesc: "Complete end-to-end marketing management.",
      description: "We'll handle the Planning, Implementation, Measurement, and Optimization of your complete digital marketing strategy. This allows you to concentrate on your core business while we manage your marketing efforts. This comprehensive service provides everything you need to Validate, Launch, or Scale your business through a tailored 360° approach, including Market Research, Media Planning and Forecasting, Campaign Implementation, Tracking and Analytics, and Performance Optimization using Conversion Rate Optimization techniques and Growth Hacking strategies.",
      image: "/strategy_360.webp"
    }
  ];
</script>

<section class="services-page">
  <div class="container">
    <!-- Hero Header -->
    <Reveal>
      <div class="page-hero">
        <h1>Our Services</h1>
        <p class="subtitle">We offer a personalized approach tailored to each unique business. From initial validation to full-scale growth, we partner with you at any stage of your journey.</p>
      </div>
    </Reveal>

    <!-- CTA Banner -->
    <Reveal>
      <div class="cta-banner">
        <div class="cta-content">
          <h2>Not sure where to start?</h2>
          <p>Book a free 30-minute call with one of our account managers. We'll explore potential collaboration and determine if we're the right fit for your needs.</p>
        </div>
        <button class="btn" on:click={handleContactClick}>Book Free Call</button>
      </div>
    </Reveal>

    <!-- Services Accordion -->
    <div class="services-accordion">
      {#each services as service, i}
        <Reveal delay={i * 50}>
          <div class="accordion-item" class:active={activeIndex === i}>
            <button class="accordion-header" on:click={() => toggle(i)}>
              <div class="header-content">
                <h3>{service.title}</h3>
                <p class="short-desc">{service.shortDesc}</p>
              </div>
              <span class="icon"></span>
            </button>
            
            {#if activeIndex === i}
              <div class="accordion-content" transition:slide={{ duration: 300 }}>
                <div class="content-grid">
                  <div class="content-text">
                    <p>{service.description}</p>
                    {#if service.note}
                      <p class="service-note">{service.note}</p>
                    {/if}
                  </div>
                  {#if service.image}
                    <div class="content-image">
                      <img src={service.image} alt={service.title} loading="lazy" />
                    </div>
                  {/if}
                </div>
              </div>
            {/if}
          </div>
        </Reveal>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <Reveal>
      <div class="bottom-cta">
        <h2>Ready to Transform Your Digital Marketing?</h2>
        <p>Let's discuss how we can help your business grow.</p>
        <button class="btn btn-large" on:click={handleContactClick}>Get Started Today</button>
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

  .page-hero {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .page-hero h1 {
    font-size: 4rem;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .page-hero .subtitle {
    font-size: 1.3rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* CTA Banner */
  .cta-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background: linear-gradient(135deg, var(--accent-color) 0%, #8b8ae0 100%);
    padding: 2.5rem 3rem;
    border-radius: 16px;
    margin-bottom: 4rem;
    color: white;
  }

  .cta-content h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: white;
  }

  .cta-content p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    line-height: 1.5;
  }

  .cta-banner .btn {
    background: white;
    color: var(--accent-color) !important;
    flex-shrink: 0;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .cta-banner .btn:hover {
    background: rgba(255, 255, 255, 0.95);
    color: var(--accent-color) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  /* Accordion */
  .services-accordion {
    margin-bottom: 4rem;
  }

  .accordion-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: white;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  .accordion-item:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .accordion-item.active {
    box-shadow: 0 8px 32px rgba(119, 118, 226, 0.12);
    border: 1px solid rgba(119, 118, 226, 0.2);
  }

  .accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.3s;
  }

  .accordion-header:hover {
    background: rgba(119, 118, 226, 0.03);
  }

  .header-content {
    flex: 1;
  }

  .accordion-header h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    color: var(--text-color);
    transition: color 0.3s;
  }

  .accordion-item.active .accordion-header h3 {
    color: var(--accent-color);
  }

  .short-desc {
    font-size: 1rem;
    color: var(--text-muted);
    margin: 0;
  }

  .icon {
    position: relative;
    width: 24px;
    height: 24px;
    display: block;
    flex-shrink: 0;
    margin-left: 2rem;
  }

  .icon::before, .icon::after {
    content: '';
    position: absolute;
    background-color: var(--text-muted);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
  }

  .icon::before {
    width: 100%;
    height: 2px;
  }

  .icon::after {
    width: 2px;
    height: 100%;
  }

  .accordion-item.active .icon::after {
    height: 0;
  }

  .accordion-item.active .icon::before,
  .accordion-item.active .icon::after {
    background-color: var(--accent-color);
  }

  /* Accordion Content */
  .accordion-content {
    padding: 0 2rem 2rem;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 2rem;
    align-items: start;
  }

  .content-text p {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .service-note {
    font-size: 0.95rem;
    color: var(--accent-color);
    font-style: italic;
    padding: 1rem;
    background: rgba(119, 118, 226, 0.05);
    border-left: 3px solid var(--accent-color);
    border-radius: 4px;
    margin-top: 1rem;
  }

  .content-image {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f8ff 100%);
    border-radius: 12px;
  }

  .content-image img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
  }

  /* Bottom CTA */
  .bottom-cta {
    text-align: center;
    padding: 5rem 2rem;
    background: linear-gradient(135deg, rgba(119, 118, 226, 0.08) 0%, rgba(119, 118, 226, 0.03) 100%);
    border-radius: 24px;
    border: 2px solid rgba(119, 118, 226, 0.2);
  }

  .bottom-cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .bottom-cta p {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  .btn-large {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }

  button.btn {
    background: var(--accent-color);
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.8rem 1.8rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  button.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(119, 118, 226, 0.3);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .cta-banner {
      flex-direction: column;
      text-align: center;
      padding: 2rem;
    }

    .cta-content {
      margin-bottom: 1rem;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }

    .content-image {
      order: -1;
      max-width: 200px;
      margin: 0 auto 1rem;
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

    .accordion-header {
      padding: 1.25rem 1.5rem;
    }

    .accordion-header h3 {
      font-size: 1.25rem;
    }

    .accordion-content {
      padding: 0 1.5rem 1.5rem;
    }

    .bottom-cta {
      padding: 3rem 1.5rem;
    }

    .bottom-cta h2 {
      font-size: 1.8rem;
    }
  }
</style>
