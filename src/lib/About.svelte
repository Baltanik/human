<script>
  import Reveal from './Reveal.svelte';
  import { onMount } from 'svelte';

  let sectionEl;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionEl.classList.add('is-purple');
        } else {
          sectionEl.classList.remove('is-purple');
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section id="about" bind:this={sectionEl}>
  <div class="container">
    <div class="about-grid">
      <Reveal>
        <div class="photo-col">
          <img src="/1614590410625.jpeg" alt="Arturo Bueno" class="profile-photo" />
        </div>
      </Reveal>

      <div class="content-col">
        <Reveal delay={100}>
          <!-- mobile header: foto + label+titolo affiancati -->
          <div class="mobile-header">
            <img src="/1614590410625.jpeg" alt="Arturo Bueno" class="profile-photo-sm" />
            <div class="mobile-header-text">
              <span class="label">About</span>
              <h2>Arturo<br><span class="role">Founder & Paid Media Strategist</span></h2>
            </div>
          </div>

          <span class="label desktop-label">About</span>
          <h2 class="desktop-h2">Arturo | Founder & Paid Media Strategist</h2>

          <p class="lead">After a decade at top digital marketing agencies managing six-figure monthly budgets, I founded Human Marketing to give SMBs direct access to senior-level paid media expertise.</p>
          <p class="body-text">Having helped companies of all sizes validate and scale, my method combines deep technical knowledge with data analysis, rapid experimentation, and growth hacking. This approach is designed to refine processes, gather actionable learnings, and consistently achieve your business goals.</p>

          <div class="specializations">
            <h3>Specializations</h3>
            <ul>
              <li>Media Planning & Budget optimization</li>
              <li>Data Analysis & Visualization</li>
              <li>Attribution Modeling and Cross-channel Optimization</li>
            </ul>
          </div>

          <div class="details">
            <div class="detail-item">
              <span class="detail-label">Based in</span>
              <span class="detail-value">Europe (working worldwide)</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Languages</span>
              <span class="detail-value">EN · ES · IT · PT</span>
            </div>
          </div>

          <div class="social-links">
            <a href="https://linkedin.com/in/arturobueno" target="_blank" rel="noopener noreferrer" class="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
  }

  .photo-col { flex-shrink: 0; }

  .profile-photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent-light);
    box-shadow: 0 10px 40px rgba(119, 118, 226, 0.2);
  }

  .label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color);
    font-size: 0.85rem;
    font-weight: 700;
    display: block;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  .lead {
    font-size: 1.15rem;
    font-weight: 500;
  }

  .specializations {
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 3px solid var(--accent-color);
  }

  .specializations h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .specializations ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .specializations li {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    padding-left: 1.25rem;
    position: relative;
  }

  .specializations li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-weight: bold;
  }

  .details {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0,0,0,0.1);
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .detail-value {
    font-size: 1rem;
    font-weight: 600;
  }

  .social-links { margin-top: 1.5rem; }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 500;
  }

  /* Mobile header: hidden on desktop */
  .mobile-header { display: none; }
  .profile-photo-sm { display: none; }

  @media (max-width: 700px) {
    section {
      padding: 2.5rem 0;
    }

    /* Griglia desktop → colonna unica */
    .about-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    /* Mostra mobile-header, nascondi versione desktop */
    .photo-col { display: none; }
    .desktop-label { display: none; }
    .desktop-h2 { display: none; }

    /* Mobile header: foto + identità affiancati */
    .mobile-header {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      margin-bottom: 1.25rem;
    }

    .profile-photo-sm {
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--accent-light);
      box-shadow: 0 6px 20px rgba(119,118,226,0.18);
      flex-shrink: 0;
    }

    .mobile-header-text {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .mobile-header-text .label {
      font-size: 0.72rem;
      margin-bottom: 0.15rem;
    }

    .mobile-header-text h2 {
      font-size: 1.15rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0;
    }

    .mobile-header-text .role {
      font-size: 0.88rem;
      font-weight: 500;
      color: var(--text-muted);
    }

    /* Testi: allineati a sinistra, leggibili */
    .lead {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.65;
      margin-bottom: 1rem;
      text-align: left;
    }

    .body-text {
      display: none;
    }

    .specializations {
      margin-top: 0.5rem;
      padding: 1rem;
      text-align: left;
    }

    .specializations h3 {
      font-size: 0.95rem;
    }

    .specializations li {
      font-size: 0.9rem;
    }

    /* Details in riga */
    .details {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.75rem 2rem;
      margin-top: 1rem;
      padding-top: 1rem;
      align-items: flex-start;
    }

    .detail-label { font-size: 0.7rem; }
    .detail-value { font-size: 0.9rem; }

    .social-links { margin-top: 1.25rem; }
  }
</style>
