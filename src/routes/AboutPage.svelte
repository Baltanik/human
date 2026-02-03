<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import Reveal from '../lib/Reveal.svelte';

  onMount(() => {
    window.scrollTo(0, 0);
  });

  function handleContactClick(e) {
    e.preventDefault();
    push('/');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  const values = [
    {
      title: "Work-Life Balance",
      description: "We focus our energy on delivering exceptional results and tangible value for all. We don't offer empty promises; we provide demonstrable value."
    },
    {
      title: "Selective Partnerships",
      description: "We selectively partner with businesses whose vision we believe in. Your goals are our goals, and we are committed to your values."
    },
    {
      title: "Realistic Expectations",
      description: "We uphold realistic expectations and value both our clients' and our own time. We are committed to fostering a healthy work environment."
    },
    {
      title: "Respect & Equality",
      description: "We treat everyone with dignity and expect the same in return. We champion equality and believe every individual deserves fairness and respect."
    }
  ];
</script>

<section class="about-page">
  <div class="container">
    <!-- Hero -->
    <Reveal>
      <div class="page-hero">
        <span class="label">About Us</span>
        <h1>Human-First Marketing</h1>
        <p class="tagline">Leveraging AI, technology and data while staying human-centric.</p>
      </div>
    </Reveal>

    <!-- Who We Are -->
    <Reveal>
      <div class="section who-we-are">
        <div class="section-content">
          <h2>Who We Are</h2>
          <p class="lead">Human Marketing is a Human-First Agency that leverages AI, technology and data to optimize processes and maximize results, all while staying human-centric.</p>
          <p>We focus on delivering value to our clients by helping them validate, launch, or scale their businesses with top-notch digital marketing campaigns.</p>
          <p>Our expertise lies in <strong>Planning</strong>, <strong>Implementation</strong>, and <strong>Measurement</strong> across multiple paid advertising platforms.</p>
          <p class="highlight">We craft state-of-the-art digital marketing campaigns.</p>
        </div>
      </div>
    </Reveal>

    <!-- Values -->
    <div class="section values-section">
      <Reveal>
        <h2>Our Values</h2>
      </Reveal>
      <div class="values-grid">
        {#each values as value, i}
          <Reveal delay={i * 100}>
            <div class="value-card">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          </Reveal>
        {/each}
      </div>
    </div>

    <!-- What Makes Us Human -->
    <Reveal>
      <div class="section human-section">
        <h2>What Makes Us Human</h2>
        <div class="human-content">
          <blockquote>
            <p>At the heart of our agency are human connections. We prioritize people—both our clients and our collaborators—recognizing that our work is fundamentally for and about individuals.</p>
            
            <p>We believe in a work-life balance, focusing our energy on delivering exceptional results and tangible value for all. We don't offer empty promises; we provide demonstrable value.</p>
            
            <p>We selectively partner with businesses whose vision we believe in. Your goals are our goals, and we are committed to your values, understanding that your success is intrinsically linked to our own.</p>
            
            <p>We uphold realistic expectations and we value both our clients' and our own time. We are committed to fostering a healthy work environment.</p>
            
            <p>Respect is paramount. We treat everyone with dignity and expect the same in return. We champion equality and believe every individual deserves to be treated with fairness and respect.</p>
          </blockquote>
        </div>
      </div>
    </Reveal>

    <!-- CTA -->
    <Reveal>
      <div class="bottom-cta">
        <h2>Ready to Work Together?</h2>
        <p>Let's see if we're the right fit for your business.</p>
        <button class="btn btn-large" on:click={handleContactClick}>Get in Touch</button>
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

  .page-hero {
    text-align: center;
    margin-bottom: 5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--accent-color);
    font-size: 0.9rem;
    font-weight: 700;
    display: block;
    margin-bottom: 1rem;
  }

  .page-hero h1 {
    font-size: 4rem;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .tagline {
    font-size: 1.4rem;
    color: var(--text-muted);
    line-height: 1.5;
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
  }

  /* Who We Are */
  .who-we-are {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .section-content p {
    font-size: 1.15rem;
    color: var(--text-muted);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .section-content .lead {
    font-size: 1.3rem;
    color: var(--text-color);
    font-weight: 500;
  }

  .section-content .highlight {
    font-size: 1.2rem;
    color: var(--accent-color);
    font-weight: 600;
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(119, 118, 226, 0.05);
    border-radius: 12px;
    text-align: center;
  }

  /* Values */
  .values-section h2 {
    text-align: center;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }

  .value-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .value-card:hover {
    box-shadow: 0 8px 32px rgba(119, 118, 226, 0.1);
    border-color: rgba(119, 118, 226, 0.2);
    transform: translateY(-4px);
  }

  .value-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .value-card p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  /* What Makes Us Human */
  .human-section {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .human-section h2 {
    text-align: center;
  }

  .human-content {
    background: linear-gradient(135deg, rgba(119, 118, 226, 0.05) 0%, rgba(119, 118, 226, 0.02) 100%);
    border-radius: 20px;
    padding: 3rem;
    border-left: 4px solid var(--accent-color);
  }

  blockquote {
    margin: 0;
  }

  blockquote p {
    font-size: 1.1rem;
    color: var(--text-color);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  blockquote p:last-child {
    margin-bottom: 0;
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
  @media (max-width: 768px) {
    .about-page {
      padding: 6rem 0 3rem;
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

    .values-grid {
      grid-template-columns: 1fr;
    }

    .human-content {
      padding: 2rem;
    }

    .bottom-cta {
      padding: 3rem 1.5rem;
    }

    .bottom-cta h2 {
      font-size: 1.8rem;
    }
  }
</style>
