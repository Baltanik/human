<script>
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="container">
    <div class="footer-main">
      <div class="footer-brand">
        <h3>Human</h3>
        <p>Senior-level paid media expertise.<br>Without the agency overhead.</p>
        <div class="socials">
          <a href="https://linkedin.com/in/arturobueno" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">About</a></li>
            <li><a href="#/services">Services</a></li>
          </ul>
        </div>

        <div class="link-col">
          <h4>Get Started</h4>
          <ul>
            <li><a href="#/book-a-call">Book a Call</a></li>
            <li><a href="mailto:arturo@wearehumanmarketing.com">Email Me</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {year} Human Marketing Agency. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: linear-gradient(180deg, white 0%, #fafafa 100%);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding: 5rem 0 2rem;
    margin-top: auto;
    color: var(--text-color);
  }

  .footer-main {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 6rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
  }

  /* Brand Section */
  .footer-brand h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 800;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .footer-brand p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .socials {
    display: flex;
    gap: 0.75rem;
  }

  .socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: white;
    border: 2px solid rgba(0, 0, 0, 0.08);
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  .socials a:hover {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(119, 118, 226, 0.3);
  }

  /* Links Section */
  .footer-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }

  .link-col h4 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.25rem;
    color: var(--text-color);
    font-weight: 700;
  }

  .link-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .link-col li {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  .link-col li a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .link-col li a:hover {
    color: var(--accent-color);
  }

  /* Bottom Bar */
  .footer-bottom {
    text-align: center;
  }

  .footer-bottom p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .footer-main {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 600px) {
    footer {
      padding: 4rem 0 2rem;
    }

    .footer-links {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-bottom {
      text-align: center;
    }
  }
</style>
