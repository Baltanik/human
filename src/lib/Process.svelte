<script>
  import Reveal from './Reveal.svelte';
  import { Paintbrush, Settings, Scale, Maximize2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-svelte';

  const steps = [
    {
      num: '01',
      title: 'Plan',
      desc: 'Audit your current state, define goals, and build a roadmap.',
      details: 'We begin with a deep dive into your market position, audience, and competitors to identify the optimal channel mix. This involves crafting a compelling, consistent message to be strategically communicated across all platforms. The result is a comprehensive strategy designed to ensure maximum reach and measurable success.',
      icon: Paintbrush
    },
    {
      num: '02', 
      title: 'Implement',
      desc: 'Execute high-performance campaigns with precision and creative excellence.',
      details: 'We transition from strategy to action by launching data-driven campaigns across your selected marketing ecosystem. I will handle everything from technical setup and tracking to creative deployment, ensuring every touchpoint is optimized. This phase is about seamless execution and getting your message in front of the right eyes at the right time.',
      icon: Settings
    },
    {
      num: '03',
      title: 'Measure',
      desc: 'Track key performance indicators to turn raw data into actionable insights.',
      details: 'We don\'t look at vanity metrics; we focus on the KPIs that impact your bottom line. By utilizing advanced analytics and data analysis, we pinpoint exactly what is driving conversions and where the friction lies. You receive transparent reporting that translates data into clear, actionable insights for your business.',
      icon: Scale
    },
    {
      num: '04',
      title: 'Scale',
      desc: 'Expand winning strategies to maximize your return on investment.',
      details: 'Once we identify the "winners," we shift gears to amplify your results. This involves increasing budgets strategically, expanding into new audiences, and diversifying creative assets to maintain momentum. We focus on growing your volume while protecting your efficiency, ensuring your cost-per-acquisition remains sustainable as we scale.',
      icon: Maximize2
    },
    {
      num: '05',
      title: 'Repeat',
      desc: 'Maintain a cycle of continuous optimization to stay ahead of the market.',
      details: 'Success in digital marketing is a moving target, so we never settle for "good enough." We take the learnings from every cycle to refine the plan and start the process again with even better data. This iterative approach ensures your brand remains agile, competitive, and consistently profitable in an ever-changing landscape.',
      icon: RefreshCw
    }
  ];

  let currentStep = 0;

  function nextStep() {
    currentStep = (currentStep + 1) % steps.length;
  }

  function prevStep() {
    currentStep = (currentStep - 1 + steps.length) % steps.length;
  }

  function goToStep(index) {
    currentStep = index;
  }
</script>

<section class="process" id="process">
  <div class="container">
    <Reveal>
      <h2>How it works</h2>
      <p class="intro">A straightforward process focused on results.</p>
    </Reveal>

    <Reveal delay={200}>
      <div class="carousel-container">
        <!-- Navigation Left -->
        <button class="nav-btn prev" on:click={prevStep} aria-label="Previous step">
          <ChevronLeft size={32} />
        </button>

        <!-- Carousel Track/Content -->
        <div class="carousel-content">
          {#key currentStep}
            <div class="step-card">
              <div class="card-left">
                <div class="icon-wrapper">
                  <svelte:component this={steps[currentStep].icon} size={48} />
                </div>
                <span class="step-num">{steps[currentStep].num}</span>
                <h3>{steps[currentStep].title}</h3>
                <p class="desc">{steps[currentStep].desc}</p>
              </div>
              <div class="card-right">
                <p class="details">{steps[currentStep].details}</p>
              </div>
            </div>
          {/key}
        </div>

        <!-- Navigation Right -->
        <button class="nav-btn next" on:click={nextStep} aria-label="Next step">
          <ChevronRight size={32} />
        </button>
      </div>

      <!-- Pagination Dots -->
      <div class="pagination">
        {#each steps as _, i}
          <button 
            class="dot" 
            class:active={currentStep === i} 
            on:click={() => goToStep(i)}
            aria-label={`Go to step ${i + 1}`}
          ></button>
        {/each}
      </div>
    </Reveal>
  </div>
</section>

<style>
  .process {
    padding: 6rem 0;
    background: #fafafa;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .intro {
    text-align: center;
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 4rem;
  }

  .carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .nav-btn {
    background: white;
    color: var(--text-color);
    border: 1px solid rgba(0,0,0,0.05);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
    flex-shrink: 0;
    z-index: 10;
  }

  .nav-btn:hover {
    background: var(--accent-color);
    color: white;
    transform: scale(1.05);
  }

  .carousel-content {
    flex: 1;
    overflow: hidden;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.03);
    min-height: 380px;
    display: flex;
  }

  .step-card {
    display: flex;
    width: 100%;
    animation: fadeSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-left {
    flex: 0 0 40%;
    padding: 3rem;
    background: var(--accent-light);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-right: 1px solid rgba(0,0,0,0.05);
  }

  .card-right {
    flex: 1;
    padding: 3rem;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color);
  }

  .icon-wrapper {
    color: var(--accent-color);
    margin-bottom: 1.5rem;
  }

  .step-num {
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }

  .card-left h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    font-weight: 700;
  }

  .desc {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .details {
    margin: 0;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 3rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(0,0,0,0.1);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background: var(--accent-color);
    transform: scale(1.3);
  }

  .dot:hover:not(.active) {
    background: rgba(0,0,0,0.2);
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 900px) {
    .step-card {
      flex-direction: column;
    }
    
    .card-left {
      border-right: none;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      padding: 2rem;
      align-items: center;
      text-align: center;
    }

    .card-right {
      padding: 2rem;
      font-size: 1rem;
    }

    .nav-btn {
      display: none; /* Hide arrows on mobile, rely on dots/swipe (ideal) but for purely dots: */
    }
  }
</style>
