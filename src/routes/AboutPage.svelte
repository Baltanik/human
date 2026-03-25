<script>
  import { onMount } from 'svelte';
  import Reveal from '../lib/Reveal.svelte';
  import Contact from '../lib/Contact.svelte';

  let sectionEl;
  let scrollProgress = 0; // 0 = top (white), 1 = bottom (full purple)

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
  // We anchor it with 5 stops spread across the section height
  $: bgStyle = (() => {
    const t = scrollProgress;
    const WHITE  = '#ffffff';
    const PURPLE = '#7776E2';
    // The visible viewport slice moves through the section; drive the gradient end-point
    const endColor = lerp(WHITE, PURPLE, t);
    const midColor = lerp(WHITE, PURPLE, t * 0.5);
    return `background: linear-gradient(to bottom, ${WHITE} 0%, ${midColor} 45%, ${endColor} 100%)`;
  })();

  // Text adapts: beyond 60% progress switch to light text
  $: isDark = scrollProgress > 0.55;

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

  const featuredClients = [
    {
      name: 'Enel',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" fill="none">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="36" font-weight="900" fill="#007CC2">enel</text>
      </svg>`
    },
    {
      name: 'AC Milan',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <text x="50%" y="42%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#C8102E">AC</text>
        <text x="50%" y="68%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="900" fill="#C8102E">MILAN</text>
      </svg>`
    },
    {
      name: 'Crocs',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="#009B48">crocs</text>
      </svg>`
    },
    {
      name: 'Formula E',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#050505">FORMULA</text>
        <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="900" fill="#050505">E</text>
      </svg>`
    },
    {
      name: 'Treatwell',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="#6B3FA0">treatwell</text>
      </svg>`
    },
    {
      name: 'Cazoo',
      logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="900" fill="#FF4E00">cazoo</text>
      </svg>`
    }
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
    { platform: 'Google Ads', category: 'paid', icon: null },
    { platform: 'Meta Ads', category: 'paid', icon: 'meta' },
    { platform: 'TikTok Ads', category: 'paid', icon: 'tiktok' },
    { platform: 'LinkedIn Ads', category: 'paid', icon: 'linkedin' },
    { platform: 'Bing Ads', category: 'paid', icon: null },
    { platform: 'Criteo', category: 'paid', icon: null },
    { platform: 'Google Analytics', category: 'analytics', icon: null },
    { platform: 'Looker Studio', category: 'analytics', icon: null },
    { platform: 'TripleWhale', category: 'analytics', icon: null },
    { platform: 'Shopify', category: 'tech', icon: null },
    { platform: 'HubSpot', category: 'tech', icon: null }
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
      <Reveal>
        <div class="section-header">
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
                {@html client.logo}
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

    <!-- ─── CERTIFICATIONS ─── -->
    <div class="section certifications-section">
      <Reveal>
        <div class="section-header">
          <span class="eyebrow">Credentials</span>
          <h2>Certifications & Awards</h2>
        </div>
      </Reveal>

      <!-- Award featured banner -->
      <Reveal delay={80}>
        <div class="award-banner">
          <div class="award-banner-left">
            <div class="award-star-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFD700" stroke="#F4A800" stroke-width="1"/>
              </svg>
            </div>
            <div>
              <p class="award-banner-label">Google Award · Italy · 2019</p>
              <p class="award-banner-title">Performance Excellence Award</p>
            </div>
          </div>
          <p class="award-banner-detail">Top 10 Italian Practitioners</p>
        </div>
      </Reveal>

      <!-- Cert strip -->
      <div class="cert-strip">
        {#each certifications as cert, i}
          <Reveal delay={i * 50 + 150}>
            <div class="cert-item">
              <div class="cert-item-icon" style="background: {cert.color}10; border-color: {cert.color}20;">
                {#if cert.icon === 'google'}
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                {:else}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="{cert.color}">
                    <path d="M11.601 1.677C6.024 1.677 1.5 6.2 1.5 11.776c0 4.147 2.496 7.72 6.1 9.3l3.498-9.573H8.86V9.924h5.555l-1.17 3.202h-1.19l-2.898 7.93c.6.11 1.21.17 1.844.17 5.577 0 10.1-4.523 10.1-10.1 0-5.576-4.523-10.1-10.1-10.1l.001-.249z"/>
                  </svg>
                {/if}
              </div>
              <div class="cert-item-info">
                <span class="cert-item-name">{cert.name}</span>
                <span class="cert-item-issuer" style="color: {cert.color}">{cert.issuer}</span>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </Reveal>
        {/each}
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
              {#if item.icon === 'meta'}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5c.69 0 1.25.56 1.25 1.25S17.19 11 16.5 11s-1.25-.56-1.25-1.25S15.81 8.5 16.5 8.5zm-9 0c.69 0 1.25.56 1.25 1.25S8.19 11 7.5 11s-1.25-.56-1.25-1.25S6.81 8.5 7.5 8.5zM12 18c-2.76 0-5.16-1.4-6.6-3.53.74-.65 2.12-1.47 3.6-1.47.87 0 1.7.26 2.4.7a4.92 4.92 0 0 0 2.4-.7c1.48 0 2.86.82 3.6 1.47C15.16 16.6 12.76 18 12 18z"/>
                </svg>
              {:else if item.icon === 'tiktok'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              {:else if item.icon === 'linkedin'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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

  .client-logo-wrap {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .client-logo-wrap :global(svg) {
    width: 100%;
    height: 100%;
    opacity: 0.55;
    transition: opacity 0.3s ease, filter 0.4s ease;
  }

  .is-dark .client-logo-wrap :global(svg) {
    filter: brightness(0) invert(1);
    opacity: 0.7;
  }

  .featured-client-card:hover .client-logo-wrap :global(svg) {
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

  /* ── CERTIFICATIONS ── */
  .certifications-section {
    text-align: center;
  }

  /* Award banner — full width, caldo e prominente */
  .award-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #fffbe6 0%, #fff0c0 100%);
    border: 1.5px solid rgba(244,168,0,0.25);
    border-radius: 20px;
    padding: 1.75rem 2.25rem;
    max-width: 860px;
    margin: 0 auto 2rem;
    gap: 1.5rem;
  }

  .award-banner-left {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .award-star-wrap {
    width: 52px;
    height: 52px;
    background: #ffffff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(244,168,0,0.18);
  }

  .award-banner-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #c47a00;
    margin: 0 0 0.3rem;
  }

  .award-banner-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.2;
  }

  .award-banner-detail {
    font-size: 0.88rem;
    color: #8a6200;
    font-style: italic;
    margin: 0;
    white-space: nowrap;
  }

  /* Cert strip — riga orizzontale di 5 pill */
  .cert-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    max-width: 860px;
    margin: 0 auto;
  }

  .cert-item {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 100px;
    padding: 0.55rem 1rem 0.55rem 0.6rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cert-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(119,118,226,0.1);
    border-color: rgba(119,118,226,0.2);
  }

  .cert-item-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cert-item-info {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    text-align: left;
  }

  .cert-item-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: #050505;
    line-height: 1.2;
  }

  .cert-item-issuer {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  /* is-dark: mantieni bianchi su sfondo viola */
  .is-dark .award-banner {
    background: linear-gradient(135deg, #fffbe6 0%, #fff0c0 100%);
    border-color: rgba(244,168,0,0.3);
  }

  .is-dark .cert-item {
    background: rgba(255,255,255,0.95);
    border-color: rgba(255,255,255,0.5);
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

    .award-banner {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .award-banner-detail {
      white-space: normal;
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

  }
</style>
