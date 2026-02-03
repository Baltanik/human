<script>
  import Reveal from './Reveal.svelte';
  import { slide } from 'svelte/transition';

  let activeIndex = null;

  const steps = [
    {
      title: 'Planning',
      content: 'We identify the optimal channel mix and strategy to achieve your objectives.<br>Including platform selection, tonality, budgets, and forecasting results.',
      delivery: '24 hours'
    },
    {
      title: 'Implementation',
      content: 'From Ad Account creation to advanced full-funnel tracking.<br>We capture every touchpoint to collect vital first-party data.',
      delivery: '48-72 hours'
    },
    {
      title: 'Measurement',
      content: 'We analyze user interactions and the full customer journey.<br>Integrating platform data with GA4 and backend stats to reveal true performance.',
      delivery: '15-30 days'
    },
    {
      title: 'Optimization',
      content: 'Daily monitoring and prudent budget management to maximize ROI.<br>Continuous updates on improvements and tangible results.',
      delivery: 'Always On'
    }
  ];

  function toggle(index) {
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<section id="about">
  <div class="container">
    <div class="about-grid">
      <!-- Left Column: Narrative -->
      <div class="narrative">
        <Reveal>
          <h2>Profit with purpose.</h2>
          <p class="lead">We partner with businesses driven to create value beyond revenue.</p>
          <p>Think of us as your in-house marketing arm, ready to scale your impact with state-of-the-art strategies.</p>
          
          <div class="divider"></div>

          <h3>Our Expertise</h3>
          <p>We translate business objectives into effective paid media strategies while you focus on operations.</p>
        </Reveal>
      </div>

      <!-- Right Column: Process Accordion -->
      <div class="process">
        <Reveal delay={200}>
          <div class="accordion">
            {#each steps as step, i}
              <div class="accordion-item" class:active={activeIndex === i}>
                <button class="accordion-header" on:click={() => toggle(i)}>
                  <h4>{step.title}</h4>
                  <span class="icon"></span>
                </button>
                {#if activeIndex === i}
                  <div class="accordion-content" transition:slide={{ duration: 300 }}>
                    <div class="content-inner">
                      <p>{@html step.content}</p>
                      <div class="delivery">
                        <strong>Results in:</strong> {step.delivery}
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    padding: 8rem 0;
    background-color: #ffffff;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: start;
  }

  /* Narrative Styles */
  .label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color);
    font-size: 0.85rem;
    font-weight: 700;
    display: block;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 2rem;
    color: var(--text-color);
  }

  h3 {
    font-size: 1.5rem;
    margin: 2rem 0 1rem;
    color: var(--text-color);
  }

  p {
    color: var(--text-muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .lead {
    font-size: 1.25rem;
    color: var(--text-color);
    font-weight: 500;
  }

  .highlight {
    color: var(--accent-color);
    font-weight: 600;
  }
  
  .commitment {
    font-style: italic;
    border-left: 3px solid var(--accent-color);
    padding-left: 1rem;
  }

  .divider {
    height: 1px;
    background: rgba(0,0,0,0.1);
    margin: 3rem 0;
  }

  /* Accordion Styles */
  .accordion {
    border-top: 2px solid var(--text-color);
  }

  .accordion-item {
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  .accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.3s;
  }

  .accordion-header:hover h4 {
    color: var(--accent-color);
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-color);
  }

  .icon {
    position: relative;
    width: 20px;
    height: 20px;
    display: block;
  }

  .icon::before, .icon::after {
    content: '';
    position: absolute;
    background-color: var(--text-color);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s;
  }

  .icon::before {
    width: 100%;
    height: 2px;
  }

  .icon::after {
    width: 2px;
    height: 100%;
  }

  .active .icon::after {
    transform: translate(-50%, -50%) rotate(90deg); /* Turn + into -? No, usually + to x or - */
    /* If we turn + to -, we need to make horizontal bar stay/rotate too? */
    /* Let's make it typical: + rotates to X or just horizontal line? */
    /* If we scale Y to 0 it becomes minus */
    height: 0; 
  }
  
  .active h4 {
    color: var(--accent-color);
  }

  .content-inner {
    padding-bottom: 2rem;
    padding-right: 1rem;
  }

  .content-inner p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .delivery {
    font-size: 0.9rem;
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid var(--accent-color);
    color: var(--text-color);
  }

  .cta-wrapper {
    margin-top: 3rem;
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
  }
</style>
