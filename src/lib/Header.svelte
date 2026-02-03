<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { location } from 'svelte-spa-router';

  let scrollY = 0;
  let isScrolled = false;
  let menuOpen = false;

  $: isScrolled = scrollY > 50;
  $: isHomePage = $location === '/' || $location === '';

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<svelte:window bind:scrollY={scrollY} />

<header class:scrolled={isScrolled}>
  <div class="container navbar">
    <div class="logo">
      <a href="/">
        <img src="https://images.squarespace-cdn.com/content/v1/6818923ec0f6200fccdcffaf/c01d0e8c-1407-4749-bea0-ad9500a47e47/Web+Logo+-+Human.png?format=1500w" alt="human marketing agency" />
      </a>
    </div>
    <nav class="desktop-nav">
      <ul>
        <li><a href="#/">Home</a></li>
        <li><a href="#/about">About</a></li>
        <li><a href="#/services">Services</a></li>
      </ul>
    </nav>
    <div class="cta desktop-cta">
      <a href="#/book-a-call" class="btn">Book a Call</a>
    </div>
    
    <!-- Mobile Hamburger -->
    <button class="hamburger" class:active={menuOpen} on:click={toggleMenu} aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  
  <!-- Mobile Menu -->
  {#if menuOpen}
    <div class="mobile-menu" transition:slide={{ duration: 300 }}>
      <nav>
        <ul>
          <li><a href="#/" on:click={closeMenu}>Home</a></li>
          <li><a href="#/about" on:click={closeMenu}>About</a></li>
          <li><a href="#/services" on:click={closeMenu}>Services</a></li>
        </ul>
      </nav>
      <a href="#/book-a-call" class="btn mobile-cta" on:click={closeMenu}>Book a Call</a>
    </div>
  {/if}
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1.5rem 0;
    transition: background-color 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease;
  }

  header.scrolled {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    height: 40px;
    width: auto;
  }

  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  nav a {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    opacity: 1;
    text-transform: uppercase;
    color: var(--text-color);
  }

  nav a:hover {
    color: var(--accent-color);
  }

  .cta .btn {
    padding: 0.6rem 1.4rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Hamburger Button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    cursor: pointer;
    z-index: 100;
  }

  .hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--text-color);
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Mobile Menu */
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .mobile-menu nav ul {
    flex-direction: column;
    gap: 0;
  }

  .mobile-menu nav li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .mobile-menu nav a {
    display: block;
    padding: 1rem 0;
    font-size: 1.1rem;
  }

  .mobile-cta {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
  }

  @media (max-width: 768px) {
    .desktop-nav,
    .desktop-cta {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>
