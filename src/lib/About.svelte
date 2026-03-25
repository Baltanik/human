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
          <span class="label">About</span>
          <h2>Arturo | Founder & Paid Media Strategist</h2>
          <p class="lead">After a decade at top digital marketing agencies managing six-figure monthly budgets, I founded Human Marketing to give small and medium-sized businesses direct access to senior-level paid media expertise.</p>
          <p>Having helped companies of all sizes validate and scale, my method combines deep technical knowledge with data analysis, rapid experimentation, and growth hacking. This approach is designed to refine processes, gather actionable learnings, and consistently achieve your business goals.</p>

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
              <span class="detail-value">English, Spanish, Italian, Portuguese</span>
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

<section class="about-cta">
  <Reveal>
    <div class="about-cta-inner">
      <p class="cta-eyebrow">Ready to scale?</p>
      <h2>Book a free 30-minute strategy call.</h2>
      <p class="cta-sub">No pitch, just clarity on your next steps.</p>
      <a href="#contact" class="btn btn-primary">Let's Talk</a>
    </div>
  </Reveal>
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

  @media (max-width: 700px) {
    .about-grid {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 2rem;
    }
    .photo-col { display: flex; justify-content: center; }
    .profile-photo { width: 140px; height: 140px; }
    .details { flex-direction: column; gap: 1rem; align-items: center; }
    .social-links { display: flex; justify-content: center; }
  }

  /* CTA */
  .about-cta {
    padding: 5rem 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #2d2b55 100%);
    text-align: center;
  }

  .about-cta-inner {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .cta-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--accent-light);
    margin-bottom: 1rem;
  }

  .about-cta h2 {
    font-size: 2.2rem;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 0.75rem;
  }

  .cta-sub {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 2rem;
  }

  .btn-primary {
    display: inline-block;
    padding: 0.9rem 2.5rem;
    background: var(--accent-color);
    color: #ffffff;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.15s ease;
  }

  .btn-primary:hover {
    background: #5a59c8;
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    .about-cta h2 { font-size: 1.7rem; }
  }
</style>
