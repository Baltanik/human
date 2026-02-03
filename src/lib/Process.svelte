<script>
  import Reveal from './Reveal.svelte';

  const steps = [
    {
      num: '01',
      title: 'Plan',
      desc: 'Audit your current state, define goals, and build a roadmap.'
    },
    {
      num: '02', 
      title: 'Implement',
      desc: 'Set up campaigns, tracking, and creative with precision.'
    },
    {
      num: '03',
      title: 'Measure',
      desc: 'Track what matters. Clear reporting tied to revenue.'
    },
    {
      num: '04',
      title: 'Scale',
      desc: 'Optimize, expand, and grow profitably.'
    }
  ];
</script>

<section class="process" id="process">
  <div class="container">
    <Reveal>
      <h2>How it works</h2>
      <p class="intro">A straightforward process focused on results.</p>
    </Reveal>

    <div class="steps-grid">
      {#each steps as step, i}
        <Reveal delay={i * 100}>
          <div class="step">
            <span class="step-num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        </Reveal>
      {/each}
    </div>
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

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .step {
    text-align: center;
    padding: 2rem 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
    min-height: 220px;
  }

  .step:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  }

  .step-num {
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent-color);
    background: var(--accent-light);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
  }

  .step h3 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .step p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 900px) {
    .steps-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .steps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
