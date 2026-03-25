<script>
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import Header from './lib/Header.svelte';
  import Footer from './lib/Footer.svelte';
  import Home from './routes/Home.svelte';
  import AboutPage from './routes/AboutPage.svelte';
  import ServicesPage from './routes/ServicesPage.svelte';
  import BookCallPage from './routes/BookCallPage.svelte';
  import BlogPage from './routes/BlogPage.svelte';
  import BlogPostPage from './routes/BlogPostPage.svelte';
  import AdminPage from './routes/AdminPage.svelte';
  import { API_BASE } from './stores/admin.js';

  const routes = {
    '/': Home,
    '/about': AboutPage,
    '/services': ServicesPage,
    '/book-a-call': BookCallPage,
    '/blog': BlogPage,
    '/blog/:slug': BlogPostPage,
    '/admin': AdminPage,
  };

  // Inject third-party tracking tags once, after settings load
  onMount(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      if (!res.ok) return;
      const s = await res.json();
      injectTags(s);
    } catch {
      // non-blocking: tracking is best-effort
    }
  });

  function injectTags({ gtm_id, ga4_id, google_ads_id, meta_pixel_id }) {
    // Google Tag Manager
    if (gtm_id) {
      const s = document.createElement('script');
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm_id}');`;
      document.head.appendChild(s);
      // noscript iframe
      const ns = document.createElement('noscript');
      ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.prepend(ns);
    }

    // GA4 (standalone, skip if GTM already covers it)
    if (ga4_id && !gtm_id) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4_id}`;
      document.head.appendChild(s);
      const s2 = document.createElement('script');
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4_id}');`;
      document.head.appendChild(s2);
    }

    // Google Ads conversion tracking
    if (google_ads_id && !gtm_id) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${google_ads_id}`;
      document.head.appendChild(s);
      const s2 = document.createElement('script');
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${google_ads_id}');`;
      document.head.appendChild(s2);
    }

    // Meta Pixel
    if (meta_pixel_id) {
      const s = document.createElement('script');
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta_pixel_id}');fbq('track','PageView');`;
      document.head.appendChild(s);
      const ns = document.createElement('noscript');
      ns.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${meta_pixel_id}&ev=PageView&noscript=1"/>`;
      document.body.prepend(ns);
    }
  }

  // Determine if current route is admin (hide header/footer)
  // svelte-spa-router fires routeLoaded with detail.location (the hash path)
  let currentPath = window.location.hash.replace(/^#/, '') || '/';
  $: isAdmin = currentPath.startsWith('/admin');

  function onRouteLoaded(e) {
      currentPath = e.detail?.location ?? (window.location.hash.replace(/^#/, '') || '/');
  }
</script>

{#if !isAdmin}<Header />{/if}

<main>
  <Router {routes} on:routeLoaded={onRouteLoaded} />
</main>

{#if !isAdmin}<Footer />{/if}

<style>
  main {
    width: 100%;
    /* overflow: hidden removed — it broke IntersectionObserver on mobile */
  }
</style>
