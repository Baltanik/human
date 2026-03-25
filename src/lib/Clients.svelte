<script>
  import Reveal from './Reveal.svelte';

  const clients = [
    'Enel', 'Formula E', 'AC Milan', 'Crocs', 'Canadian', 'Cotopaxi',
    'Medik8', 'Treatwell', 'BrumBrum', 'HiNelson', 'Truly Venice',
    'Farmaé', 'Gianluca Mech', 'Masoni Online', 'TaniniHome', 'Hurry!',
    'Rodelag', 'Luna de Oriente', 'Poin Panamá', 'RI Group', 'Aquatics'
  ];

  const certifications = [
    'Google Search Ads',
    'Google Display Ads',
    'Google Shopping',
    'Advanced Google Analytics',
    'Google Performance Excellence Award',
    'Coursera Data Analytics'
  ];
</script>

<section class="clients-section">
  <div class="container">
    <Reveal>
      <h2>Trusted By</h2>
      <div class="clients-grid">
        {#each clients as client}
          <span class="client-tag">{client}</span>
        {/each}
      </div>
    </Reveal>

    <Reveal delay={200}>
      <div class="certs-block">
        <h3>Certifications</h3>
        <div class="certs-grid">
          {#each certifications as cert}
            <span class="cert-item">{cert}</span>
          {/each}
        </div>
      </div>
    </Reveal>
  </div>
</section>

<style>
  .clients-section {
    padding: 5rem 0;
    background: #fafafa;
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .clients-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    max-width: 900px;
    margin: 0 auto 4rem;
  }

  .client-tag {
    padding: 0.6rem 1.25rem;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 40px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  .client-tag:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(119, 118, 226, 0.15);
  }

  .certs-block {
    text-align: center;
  }

  .certs-block h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--text-color);
  }

  .certs-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .cert-item {
    padding: 0.5rem 1rem;
    background: var(--accent-light);
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-color);
    transition: all 0.3s ease;
  }

  .cert-item:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }

    .client-tag {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }
  }
</style>
