<script>
  import { onMount } from 'svelte';
  import Reveal from '../lib/Reveal.svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

  const principles = [
    {
      title: "No Bullshit Reporting",
      description: "Clear metrics tied to revenue. I focus on what actually moves your business forward, not vanity metrics."
    },
    {
      title: "Fast Communication",
      description: "I respond within 24 hours. Your time matters, and you deserve answers when you need them."
    },
    {
      title: "Transparent Pricing",
      description: "Fixed monthly fees or project-based. No hidden costs, no surprises—just straightforward pricing."
    },
    {
      title: "Partnership, Not Vendor",
      description: "I only work with businesses I believe in. Your success is my success—we're in this together."
    }
  ];

  const expertise = [
    { platform: 'Google Ads', years: '10+' },
    { platform: 'Meta Ads', years: '10+' },
    { platform: 'TikTok Ads', years: '3+' },
    { platform: 'LinkedIn Ads', years: '5+' },
    { platform: 'GA4 & GTM', years: '8+' }
  ];
</script>

<section class="about-page">
  <div class="container">
    <!-- Hero with Photo -->
    <Reveal>
      <div class="page-hero">
        <div class="hero-photo">
          <img src="/1614590410625.jpeg" alt="Arturo Bueno" />
        </div>
        <h1>Meet Arturo</h1>
        <p class="tagline">10 years managing 7-figure ad budgets for top agencies.<br>Now working directly with businesses ready to scale.</p>
      </div>
    </Reveal>

    <!-- Story -->
    <Reveal>
      <div class="section story-section">
        <h2>The Story</h2>
        <div class="story-content">
          <p class="lead">After a decade working with major marketing agencies managing multi-million dollar campaigns, I realized something: great businesses often struggle to get the senior-level expertise they need without the overhead of a full agency.</p>
          
          <p>I founded Human to bridge that gap. You get direct access to someone who's managed campaigns at scale, knows the platforms inside out, and treats your budget like it's their own.</p>
          
          <p>No account managers playing telephone. No junior staff learning on your dime. Just experienced, strategic paid media management focused on one thing: <strong>turning your ad spend into revenue.</strong></p>
        </div>
      </div>
    </Reveal>

    <!-- Expertise -->
    <div class="section expertise-section">
      <Reveal>
        <h2>Platform Expertise</h2>
      </Reveal>
      <div class="expertise-grid">
        {#each expertise as item, i}
          <Reveal delay={i * 80}>
            <div class="expertise-card">
              <span class="years">{item.years}</span>
              <span class="platform">{item.platform}</span>
            </div>
          </Reveal>
        {/each}
      </div>
    </div>

    <!-- Principles -->
    <div class="section principles-section">
      <Reveal>
        <h2>How I Work</h2>
      </Reveal>
      <div class="principles-grid">
        {#each principles as principle, i}
          <Reveal delay={i * 100}>
            <div class="principle-card">
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </Reveal>
        {/each}
      </div>
    </div>

    <!-- Stats -->
    <Reveal>
      <div class="stats-banner">
        <div class="stat">
          <span class="stat-value">10+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat">
          <span class="stat-value">7-Fig</span>
          <span class="stat-label">Budgets Managed</span>
        </div>
        <div class="stat">
          <span class="stat-value">100+</span>
          <span class="stat-label">Campaigns Launched</span>
        </div>
        <div class="stat">
          <span class="stat-value">3</span>
          <span class="stat-label">Languages Fluent</span>
        </div>
      </div>
    </Reveal>

    <!-- CTA -->
    <Reveal>
      <div class="bottom-cta">
        <h2>Let's Talk</h2>
        <p>Book a free 30-minute call. I'll review your current setup and share honest feedback—no strings attached.</p>
        <a href="#/book-a-call" class="btn btn-large">Book a Call</a>
      </div>
    </Reveal>
  </div>
</section>

<style>
  .about-page {
    padding: 8rem 0 4rem;
    background-color: var(--bg-color);
    min-height: 100vh;
  }

  /* Hero */
  .page-hero {
    text-align: center;
    margin-bottom: 6rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-photo {
    width: 200px;
    height: 200px;
    margin: 0 auto 2rem;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid var(--accent-light);
    box-shadow: 0 10px 50px rgba(119, 118, 226, 0.2);
  }

  .hero-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .page-hero h1 {
    font-size: 3.5rem;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .tagline {
    font-size: 1.25rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* Sections */
  .section {
    margin-bottom: 5rem;
  }

  .section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    letter-spacing: -0.02em;
    text-align: center;
  }

  /* Story */
  .story-section {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .story-content p {
    font-size: 1.15rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .story-content .lead {
    font-size: 1.3rem;
    color: var(--text-color);
    font-weight: 500;
  }

  /* Expertise */
  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .expertise-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .expertise-card:hover {
    border-color: var(--accent-color);
    box-shadow: 0 8px 24px rgba(119, 118, 226, 0.15);
    transform: translateY(-4px);
  }

  .expertise-card .years {
    display: block;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
  }

  .expertise-card .platform {
    display: block;
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  /* Principles */
  .principles-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .principle-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    border-left: 4px solid var(--accent-color);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
  }

  .principle-card:hover {
    box-shadow: 0 8px 32px rgba(119, 118, 226, 0.15);
    transform: translateY(-4px);
  }

  .principle-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .principle-card p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* Stats Banner */
  .stats-banner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, var(--accent-color) 0%, #8b8ae0 100%);
    border-radius: 20px;
    margin: 4rem 0;
  }

  .stat {
    text-align: center;
    color: white;
  }

  .stat-value {
    display: block;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    display: block;
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Bottom CTA */
  .bottom-cta {
    text-align: center;
    padding: 5rem 2rem;
    background: white;
    border-radius: 24px;
    border: 2px solid rgba(119, 118, 226, 0.2);
  }

  .bottom-cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .bottom-cta p {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-large {
    display: inline-block;
    padding: 1.2rem 3rem;
    font-size: 1.1rem;
    background: var(--accent-color);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-large:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(119, 118, 226, 0.4);
    background: #6665d2;
    color: white;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .expertise-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .principles-grid {
      grid-template-columns: 1fr;
    }

    .stats-banner {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .about-page {
      padding: 6rem 0 3rem;
    }

    .hero-photo {
      width: 150px;
      height: 150px;
    }

    .page-hero h1 {
      font-size: 2.5rem;
    }

    .tagline {
      font-size: 1.1rem;
    }

    .section h2 {
      font-size: 2rem;
    }

    .expertise-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .stats-banner {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 2rem 1.5rem;
    }

    .stat-value {
      font-size: 2.5rem;
    }

    .bottom-cta {
      padding: 3rem 1.5rem;
    }

    .bottom-cta h2 {
      font-size: 1.8rem;
    }
  }
</style>
