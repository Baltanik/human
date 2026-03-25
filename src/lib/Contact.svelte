<script>
  import Reveal from './Reveal.svelte';
</script>

<section id="contact">
  <div class="container container-sm">
    <Reveal>
      <h2>Ready to scale?</h2>
      <p class="contact-lead">Book a free 30-minute strategy call. No pitch, just clarity on your next steps.</p>
      
      <div class="cta-wrapper">
        <a href="#/book-a-call" class="btn btn-lg">
          Let's Talk
        </a>
      </div>
      
      <span class="note">Usually responds within 24 hours</span>
    </Reveal>
  </div>
</section>

<style>
  section {
    padding: 6rem 0;
    background: linear-gradient(180deg, #fafafa 0%, white 100%);
  }

  .container-sm {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  p {
    color: var(--text-muted);
    margin-bottom: 2rem;
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .cta-wrapper {
    margin-bottom: 1.5rem;
  }

  .btn-lg {
    display: inline-block;
    padding: 1.2rem 3rem;
    font-size: 1.1rem;
    font-weight: 600;
    background: var(--accent-color);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(119, 118, 226, 0.4);
    transition: all 0.2s ease;
  }

  .btn-lg:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(119, 118, 226, 0.5);
    background: #6665d2;
    color: white;
  }

  .note {
    font-size: 0.9rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  .contact-lead {
    max-width: 22rem;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }

    h2 {
      font-size: clamp(1.65rem, 6vw, 2.25rem);
      margin-bottom: 0.65rem;
    }

    .contact-lead {
      font-size: 1rem;
      margin-bottom: 1.35rem;
      line-height: 1.55;
    }

    .btn-lg {
      padding: 0.95rem 1.75rem;
      font-size: 1rem;
      width: 100%;
      max-width: 20rem;
    }

    .cta-wrapper {
      margin-bottom: 1rem;
    }

    .note {
      font-size: 0.8rem;
    }
  }
</style>
