<script>
  import { onMount } from 'svelte';
  import Reveal from './Reveal.svelte';

  const steps = [
    {
      number: "01",
      title: "Audit",
      description: "Deep dive technical & account analysis.",
      image: "/account_audit.webp"
    },
    {
      number: "02",
      title: "Plan",
      description: "Strategic roadmap & budget allocation.",
      image: "/strategy_360.webp"
    },
    {
      number: "03",
      title: "Setup",
      description: "Campaign architecture & pixel perfection.",
      image: "/campaign_setup.webp"
    },
    {
      number: "04",
      title: "Track",
      description: "Server-side tracking & analytics setup.",
      image: "/tracking_analytics.webp"
    },
    {
      number: "05",
      title: "Launch",
      description: "Go-live with controlled scaling.",
      image: "/media_planning.webp"
    },
    {
      number: "06",
      title: "Optimize",
      description: "Daily data-driven refinements.",
      image: "/data_analysis.webp"
    },
    {
      number: "07",
      title: "Scale",
      description: "Sustainable growth & CRO.",
      image: "/cro_wireframe.webp",
      icon: true
    }
  ];

  let scrollY = 0;
  let sectionTop = 0;
  let sectionElement;
  
  let activeStep = 0;

  function updateActiveStep() {
    if (!sectionElement) return;
    
    const rect = sectionElement.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;
    
    // Se la sezione è visibile nel viewport
    if (rect.top < viewportMiddle && rect.bottom > viewportMiddle) {
      // Calcola quale step dovrebbe essere attivo basandosi sulla posizione
      const sectionProgress = (viewportMiddle - rect.top) / rect.height;
      activeStep = Math.min(steps.length - 1, Math.floor(sectionProgress * steps.length));
    }
  }

  onMount(() => {
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    updateActiveStep();
    
    return () => {
      window.removeEventListener('scroll', updateActiveStep);
    };
  });
</script>

<svelte:window bind:scrollY />

<section id="services" bind:this={sectionElement}>
  <div class="container">
    <Reveal>
      <div class="section-header">
        <h2>Our Services</h2>
        <p>A meticulous journey from audit to excellence.</p>
      </div>
    </Reveal>

    <div class="timeline">
      <!-- Vertical Line -->
      <div class="timeline-line">
        <div class="timeline-progress" style="height: {((activeStep + 1) / steps.length) * 100}%"></div>
      </div>

      <!-- Steps -->
      <div class="steps-container">
        {#each steps as step, i}
          <Reveal delay={i * 100}>
            <div class="step-item" class:active={i <= activeStep}>
              <div class="step-marker">
                {#if step.icon}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                {:else}
                  <span>{step.number}</span>
                {/if}
              </div>
              
              <div class="step-content">
                <div class="step-text">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                
                {#if step.image}
                  <div class="step-visual">
                    <img src={step.image} alt={step.title} loading="lazy" />
                  </div>
                {/if}
              </div>
            </div>
          </Reveal>
        {/each}
      </div>
    </div>

    <!-- CTA Section -->
    <Reveal>
      <div class="services-cta">
        <h3>Discover All Our Services</h3>
        <p>Explore our complete range of digital marketing solutions tailored to your business needs.</p>
        <a href="#/services" class="btn btn-large">View All Services</a>
      </div>
    </Reveal>
  </div>
</section>

<style>
  section {
    padding: 8rem 0;
    background-color: var(--bg-color);
  }

  .section-header {
    text-align: center;
    margin-bottom: 6rem;
  }

  .section-header h2 {
    font-size: 4rem;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }

  .section-header p {
    font-size: 1.5rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }

  .timeline {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Vertical Line */
  .timeline-line {
    position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .timeline-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--accent-color);
    box-shadow: 0 0 20px var(--accent-color);
    border-radius: 4px;
    transition: height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  /* Steps Container */
  .steps-container {
    position: relative;
    z-index: 1;
  }

  .step-item {
    display: flex;
    gap: 4rem;
    margin-bottom: 6rem;
    align-items: flex-start;
  }

  .step-item:last-child {
    margin-bottom: 0;
  }

  /* Step Marker (Circle) */
  .step-marker {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: var(--bg-color);
    border: 3px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-muted);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    z-index: 2;
  }

  .step-item.active .step-marker {
    border-color: var(--accent-color);
    background: var(--accent-color);
    color: white;
    box-shadow: 0 0 40px var(--accent-color);
    transform: scale(1.1);
  }

  .step-marker svg {
    width: 40px;
    height: 40px;
  }

  /* Step Content */
  .step-content {
    flex: 1;
    display: flex;
    gap: 3rem;
    align-items: center;
    opacity: 0.4;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    padding: 1.5rem;
    border-radius: 16px;
    background: transparent;
  }

  .step-item.active .step-content {
    opacity: 1;
    transform: translateY(0);
    background: linear-gradient(135deg, rgba(119, 118, 226, 0.02) 0%, rgba(119, 118, 226, 0.05) 100%);
  }

  .step-text {
    flex: 1;
  }

  .step-text h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .step-text p {
    font-size: 1.2rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .step-visual {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    border-radius: 16px;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    padding: 0.5rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .step-item.active .step-visual {
    transform: scale(1.08);
  }

  .step-visual img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    filter: drop-shadow(0 4px 12px rgba(119, 118, 226, 0.15));
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .step-item.active .step-visual img {
    filter: drop-shadow(0 8px 24px rgba(119, 118, 226, 0.3));
  }

  /* Services CTA */
  .services-cta {
    text-align: center;
    margin-top: 6rem;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, rgba(119, 118, 226, 0.08) 0%, rgba(119, 118, 226, 0.03) 100%);
    border-radius: 24px;
    border: 2px solid rgba(119, 118, 226, 0.2);
  }

  .services-cta h3 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .services-cta p {
    font-size: 1.3rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-large {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .section-header h2 {
      font-size: 3rem;
    }

    .timeline-line {
      left: 40px;
    }

    .step-marker {
      width: 80px;
      height: 80px;
      font-size: 1.4rem;
    }

    .step-item {
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .step-content {
      flex-direction: column;
      gap: 2rem;
    }

    .step-text h3 {
      font-size: 1.8rem;
    }

    .step-text p {
      font-size: 1rem;
    }

    .step-visual {
      width: 180px;
      height: 180px;
      padding: 1.2rem;
    }

    .services-cta h3 {
      font-size: 2.2rem;
    }

    .services-cta p {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 600px) {
    .section-header h2 {
      font-size: 2.5rem;
    }

    .timeline-line {
      left: 30px;
    }

    .step-marker {
      width: 60px;
      height: 60px;
      font-size: 1rem;
    }

    .step-marker svg {
      width: 24px;
      height: 24px;
    }

    .step-item {
      gap: 1.5rem;
    }

    .step-visual {
      width: 160px;
      height: 160px;
      padding: 1rem;
    }

    .services-cta {
      padding: 3rem 1.5rem;
      margin-top: 4rem;
    }

    .services-cta h3 {
      font-size: 1.8rem;
    }

    .services-cta p {
      font-size: 1rem;
    }
  }
</style>
