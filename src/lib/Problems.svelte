<script>
  import Reveal from './Reveal.svelte';
  import { BarChart3, Flame, DollarSign } from 'lucide-svelte';

  const items = [
    {
      problem: "Burning budget on ads that don't convert?",
      solution: "I build campaigns designed to pay for themselves.",
      icon: Flame
    },
    {
      problem: "Tired of 'vanity metrics' that don't match your bank balance?",
      solution: "Clear, honest reporting tied to your actual business reality.",
      icon: BarChart3
    },
    {
      problem: "Locked into rigid yearly contracts and hidden penalty fees?",
      solution: "A flexible, margin-first partnership built on consistent results.",
      icon: DollarSign
    }
  ];
</script>

<section class="problems" id="why">
  <div class="container">
    <Reveal>
      <h2>Sound familiar?</h2>
    </Reveal>

    <div class="items-grid">
      {#each items as item, i}
        <Reveal delay={i * 100}>
          <div class="item">
            <div class="problem">
              <span class="icon">
                <svelte:component this={item.icon} size={28} />
              </span>
              <p>{item.problem}</p>
            </div>
            <div class="arrow">→</div>
            <div class="solution">
              <p>{item.solution}</p>
            </div>
          </div>
        </Reveal>
      {/each}
    </div>
  </div>
</section>

<style>
  .problems {
    padding: 6rem 0;
    background: white;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 4rem;
    color: var(--text-color);
  }

  .items-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background: #fafafa;
    border-radius: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .item:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  }

  .problem {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .icon {
    flex-shrink: 0;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .problem p {
    font-size: 1.1rem;
    color: var(--text-color);
    font-weight: 500;
    margin: 0;
  }

  .arrow {
    font-size: 1.5rem;
    color: var(--accent-color);
    font-weight: bold;
  }

  .solution p {
    font-size: 1.1rem;
    color: var(--accent-color);
    font-weight: 600;
    margin: 0;
  }

  @media (max-width: 768px) {
    .item {
      grid-template-columns: 1fr;
      gap: 1rem;
      text-align: center;
    }

    .problem {
      flex-direction: column;
      gap: 0.5rem;
    }

    .arrow {
      transform: rotate(90deg);
    }
  }
</style>
