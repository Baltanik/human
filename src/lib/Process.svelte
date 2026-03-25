<script>
  import Reveal from './Reveal.svelte';
  import { onMount } from 'svelte';
  import { Paintbrush, Settings, Scale, Maximize2, RefreshCw } from 'lucide-svelte';

  const steps = [
    {
      num: '01',
      title: 'Plan',
      desc: 'Audit your current state, define goals, and build a roadmap.',
      details:
        'We begin with a deep dive into your market position, audience, and competitors to identify the optimal channel mix. This involves crafting a compelling, consistent message to be strategically communicated across all platforms. The result is a comprehensive strategy designed to ensure maximum reach and measurable success.',
      icon: Paintbrush
    },
    {
      num: '02',
      title: 'Implement',
      desc: 'Execute high-performance campaigns with precision and creative excellence.',
      details:
        'We transition from strategy to action by launching data-driven campaigns across your selected marketing ecosystem. I will handle everything from technical setup and tracking to creative deployment, ensuring every touchpoint is optimized. This phase is about seamless execution and getting your message in front of the right eyes at the right time.',
      icon: Settings
    },
    {
      num: '03',
      title: 'Measure',
      desc: 'Track key performance indicators to turn raw data into actionable insights.',
      details:
        "We don't look at vanity metrics; we focus on the KPIs that impact your bottom line. By utilizing advanced analytics and data analysis, we pinpoint exactly what is driving conversions and where the friction lies. You receive transparent reporting that translates data into clear, actionable insights for your business.",
      icon: Scale
    },
    {
      num: '04',
      title: 'Scale',
      desc: 'Expand winning strategies to maximize your return on investment.',
      details:
        'Once we identify the "winners," we shift gears to amplify your results. This involves increasing budgets strategically, expanding into new audiences, and diversifying creative assets to maintain momentum. We focus on growing your volume while protecting your efficiency, ensuring your cost-per-acquisition remains sustainable as we scale.',
      icon: Maximize2
    },
    {
      num: '05',
      title: 'Repeat',
      desc: 'Maintain a cycle of continuous optimization to stay ahead of the market.',
      details:
        'Success in digital marketing is a moving target, so we never settle for "good enough." We take the learnings from every cycle to refine the plan and start the process again with even better data. This iterative approach ensures your brand remains agile, competitive, and consistently profitable in an ever-changing landscape.',
      icon: RefreshCw
    }
  ];

  let currentStep = 0;
  let openAccordion = 0; // mobile accordion

  $: lineProgressPct =
    steps.length <= 1 ? 0 : (currentStep / (steps.length - 1)) * 100;

  function nextStep() {
    currentStep = (currentStep + 1) % steps.length;
  }

  function prevStep() {
    currentStep = (currentStep - 1 + steps.length) % steps.length;
  }

  function goToStep(index) {
    currentStep = index;
  }

  function toggleAccordion(index) {
    openAccordion = openAccordion === index ? -1 : index;
  }

  onMount(() => {
    function onKey(e) {
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<section class="process" id="process" aria-labelledby="process-heading">
  <div class="container">
    <Reveal>
      <h2 id="process-heading">How it works</h2>
      <p class="intro">A straightforward process focused on results.</p>
    </Reveal>

    <Reveal delay={200}>
      <div class="process-desktop">
        <nav class="timeline" aria-label="Process steps">
          <div class="timeline-rail" aria-hidden="true">
            <div class="timeline-rail-track"></div>
            <div class="timeline-rail-fill" style="width: {lineProgressPct}%"></div>
          </div>
          <div class="timeline-nodes">
            {#each steps as step, i}
              <button
                type="button"
                class="timeline-node"
                class:active={currentStep === i}
                class:completed={currentStep > i}
                aria-current={currentStep === i ? 'step' : undefined}
                aria-label="Step {step.num}: {step.title}"
                on:click={() => goToStep(i)}
              >
                <span class="node-disc">
                  <span class="node-num">{step.num}</span>
                </span>
                <span class="node-title">{step.title}</span>
              </button>
            {/each}
          </div>
        </nav>

        <div class="detail-panel">
          {#key currentStep}
            <article class="step-detail">
              <div class="detail-aside">
                <div class="icon-wrapper">
                  <svelte:component this={steps[currentStep].icon} size={44} stroke-width={1.75} />
                </div>
                <p class="detail-eyebrow">Step {steps[currentStep].num}</p>
                <h3>{steps[currentStep].title}</h3>
                <p class="detail-desc">{steps[currentStep].desc}</p>
              </div>
              <div class="detail-main">
                <p class="detail-body">{steps[currentStep].details}</p>
              </div>
            </article>
          {/key}
          <div class="detail-nav">
            <button type="button" class="detail-nav-btn" on:click={prevStep}>← Previous</button>
            <button type="button" class="detail-nav-btn" on:click={nextStep}>Next →</button>
          </div>
        </div>
      </div>

      <div class="process-mobile">
        {#each steps as step, i}
          <div class="accordion-item" class:open={openAccordion === i}>
            <button
              type="button"
              class="accordion-trigger"
              aria-expanded={openAccordion === i}
              on:click={() => toggleAccordion(i)}
            >
              <div class="accordion-left">
                <span class="acc-num">{step.num}</span>
                <div class="acc-icon">
                  <svelte:component this={step.icon} size={20} stroke-width={1.75} />
                </div>
                <span class="acc-title">{step.title}</span>
              </div>
              <span class="acc-chevron" aria-hidden="true">{openAccordion === i ? '−' : '+'}</span>
            </button>
            {#if openAccordion === i}
              <div class="accordion-body">
                <p class="acc-desc">{step.desc}</p>
                <p class="acc-detail">{step.details}</p>
              </div>
            {/if}
          </div>
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
    margin-bottom: 3rem;
  }

  .process-mobile {
    display: none;
  }

  .process-desktop {
    display: block;
    max-width: 1040px;
    margin: 0 auto;
  }

  /* ── Timeline (desktop) ── */
  .timeline {
    position: relative;
    margin-bottom: 2.5rem;
    padding: 0 0.5rem;
  }

  .timeline-rail {
    position: absolute;
    left: 8%;
    right: 8%;
    top: 22px;
    height: 4px;
    pointer-events: none;
  }

  .timeline-rail-track {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }

  .timeline-rail-fill {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, var(--accent-color), #a5a4f0);
    border-radius: 4px;
    transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .timeline-rail-fill {
      transition: none;
    }
  }

  .timeline-nodes {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .timeline-node {
    flex: 1;
    max-width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    padding: 0.35rem 0.25rem 0.5rem;
    margin: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    border-radius: 14px;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .timeline-node:hover {
    background: rgba(119, 118, 226, 0.08);
  }

  .timeline-node:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 4px;
  }

  .node-disc {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 3px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease,
      background 0.25s ease;
  }

  .timeline-node.completed .node-disc {
    border-color: rgba(119, 118, 226, 0.55);
    background: rgba(119, 118, 226, 0.12);
  }

  .timeline-node.active .node-disc {
    border-color: var(--accent-color);
    background: var(--accent-color);
    box-shadow: 0 6px 22px rgba(119, 118, 226, 0.45);
    transform: scale(1.08);
  }

  .node-num {
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  .timeline-node.completed .node-num {
    color: var(--accent-color);
  }

  .timeline-node.active .node-num {
    color: #ffffff;
  }

  .node-title {
    font-size: 0.78rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.25;
    color: var(--text-muted);
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
  }

  .timeline-node.active .node-title {
    color: var(--text-color);
  }

  .timeline-node.completed:not(.active) .node-title {
    color: #3d3d3d;
  }

  /* ── Detail panel ── */
  .detail-panel {
    background: #ffffff;
    border-radius: 22px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .step-detail {
    display: flex;
    width: 100%;
    min-height: 320px;
    animation: detailIn 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .step-detail {
      animation: none;
    }
  }

  @keyframes detailIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .detail-aside {
    flex: 0 0 38%;
    max-width: 380px;
    padding: 2.75rem 2.25rem;
    background: linear-gradient(165deg, rgba(119, 118, 226, 0.12) 0%, rgba(119, 118, 226, 0.04) 100%);
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .detail-main {
    flex: 1;
    padding: 2.75rem 2.5rem;
    display: flex;
    align-items: center;
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-color);
  }

  .icon-wrapper {
    color: var(--accent-color);
    margin-bottom: 1.25rem;
  }

  .detail-eyebrow {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent-color);
    margin: 0 0 0.5rem;
  }

  .detail-aside h3 {
    font-size: 1.85rem;
    margin: 0 0 0.85rem;
    color: var(--text-color);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  .detail-desc {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0;
  }

  .detail-body {
    margin: 0;
  }

  .detail-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1.25rem;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    background: #fafafa;
  }

  .detail-nav-btn {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--accent-color);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    transition: background 0.15s ease;
  }

  .detail-nav-btn:hover {
    background: rgba(119, 118, 226, 0.1);
  }

  .detail-nav-btn:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  /* ── Mobile accordion ── */
  @media (max-width: 900px) {
    .process {
      padding: 3rem 0;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 0.4rem;
    }

    .intro {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .process-desktop {
      display: none;
    }

    .process-mobile {
      display: flex;
      flex-direction: column;
      gap: 0;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 16px;
      overflow: hidden;
    }

    .accordion-item {
      border-bottom: 1px solid rgba(0,0,0,0.08);
      background: #fff;
    }

    .accordion-item:last-child {
      border-bottom: none;
    }

    .accordion-item.open {
      background: #fff;
    }

    .accordion-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.1rem 1.15rem;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      gap: 0.75rem;
    }

    .accordion-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .acc-num {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--accent-color);
      letter-spacing: 0.06em;
      min-width: 1.5rem;
    }

    .acc-icon {
      color: var(--accent-color);
      display: flex;
      align-items: center;
    }

    .acc-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-color);
    }

    .accordion-item.open .acc-title {
      color: var(--accent-color);
    }

    .acc-chevron {
      font-size: 1.4rem;
      font-weight: 300;
      color: var(--accent-color);
      line-height: 1;
      flex-shrink: 0;
    }

    .accordion-body {
      padding: 0 1.15rem 1.25rem;
      border-top: 1px solid rgba(119,118,226,0.12);
    }

    .acc-desc {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-color);
      margin: 0.85rem 0 0.6rem;
      line-height: 1.5;
    }

    .acc-detail {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin: 0;
    }
  }
</style>
