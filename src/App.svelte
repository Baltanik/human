<script>
  import Router from 'svelte-spa-router';
  import Header from './lib/Header.svelte';
  import Footer from './lib/Footer.svelte';
  import Home from './routes/Home.svelte';
  import AboutPage from './routes/AboutPage.svelte';
  import ServicesPage from './routes/ServicesPage.svelte';
  import BookCallPage from './routes/BookCallPage.svelte';

  const routes = {
    '/': Home,
    '/about': AboutPage,
    '/services': ServicesPage,
    '/book-a-call': BookCallPage,
  };
</script>

<Header />

<main>
  <Router {routes} />
</main>

<Footer />

<style>
  main {
    width: 100%;
    overflow: hidden; /* Prevent horizontal scroll from full-width sections */
  }
</style>
