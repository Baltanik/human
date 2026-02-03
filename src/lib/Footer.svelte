<script>
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="container footer-content">
    <div class="col">
      <h3>human marketing agency</h3>
    </div>
    <div class="col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </div>
    <div class="col">
      <h4>Get in Touch</h4>
      <p>info@wearehumanmarketing.com</p>
      <div class="socials">
        <a href="https://linkedin.com/company/humanmarketing" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="https://instagram.com/humanmarketing" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div class="bottom-bar">
    <div class="container">
      <p>&copy; {year} human marketing agency. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background-color: #fcfcfc;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 4rem 0 2rem;
    margin-top: auto;
    color: var(--text-color);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 4rem;
    margin-bottom: 3rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }

  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    opacity: 1;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.8;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
  }

  li a {
    color: var(--text-muted);
    font-size: 0.95rem;
    transition: color 0.2s;
  }

  li a:hover {
    color: var(--accent-color);
  }

  .socials {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-muted);
    transition: all 0.3s ease;
  }

  .socials a:hover {
    background: var(--accent-color);
    color: #fff;
    transform: translateY(-2px);
  }

  .bottom-bar {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 2rem;
    text-align: center;
  }

  .bottom-bar p {
    font-size: 0.85rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
