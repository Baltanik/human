<script>
  import { onMount } from 'svelte';
  import { getAllPosts } from '../data/blog-posts.js';
  import Reveal from '../lib/Reveal.svelte';

  const posts = getAllPosts();

  onMount(() => {
    // Update document title and meta tags for SEO
    document.title = 'Blog - Performance Marketing Insights | Human';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (metaDesc instanceof HTMLMetaElement) {
      metaDesc.content = 'Expert insights on performance marketing, paid ads, server-side tracking, CRO, and scaling strategies from 10+ years managing 6-figure ad budgets.';
    }

    // Open Graph tags
    updateMetaTag('og:title', 'Blog - Performance Marketing Insights | Human');
    updateMetaTag('og:description', 'Expert insights on performance marketing, paid ads, server-side tracking, CRO, and scaling strategies.');
    updateMetaTag('og:type', 'website');
  });

  function updateMetaTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    if (tag instanceof HTMLMetaElement) {
      tag.content = content;
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<svelte:head>
  <title>Blog - Performance Marketing Insights | Human</title>
  <meta name="description" content="Expert insights on performance marketing, paid ads, server-side tracking, CRO, and scaling strategies from 10+ years managing 6-figure ad budgets.">
</svelte:head>

<section class="blog-hero">
  <div class="container">
    <Reveal>
      <h1>Performance Marketing Insights</h1>
      <p class="subtitle">Data-driven strategies, technical deep-dives, and frameworks from 10+ years managing 6-figure ad budgets.</p>
    </Reveal>
  </div>
</section>

<section class="blog-list">
  <div class="container">
    <div class="posts-grid">
      {#each posts as post, i}
        <Reveal delay={i * 100}>
          <a href="#/blog/{post.slug}" class="post-card">
            <div class="post-image">
              <img src={post.ogImage} alt={post.title} loading="lazy" />
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">{formatDate(post.date)}</span>
                <span class="post-divider">•</span>
                <span class="post-read-time">{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p class="post-description">{post.description}</p>
              <div class="post-keywords">
                {#each post.keywords.slice(0, 3) as keyword}
                  <span class="keyword-tag">{keyword}</span>
                {/each}
              </div>
              <span class="read-more">Read Article →</span>
            </div>
          </a>
        </Reveal>
      {/each}
    </div>
  </div>
</section>

<style>
  .blog-hero {
    padding: 8rem 0 4rem;
    background: linear-gradient(180deg, #fafafa 0%, white 100%);
    text-align: center;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--text-muted);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .blog-list {
    padding: 4rem 0 6rem;
    background: white;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .post-card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  .post-image {
    width: 100%;
    height: 220px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .post-card:hover .post-image img {
    transform: scale(1.05);
  }

  .post-content {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .post-divider {
    color: rgba(0, 0, 0, 0.2);
  }

  .post-content h2 {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .post-description {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.25rem;
    flex: 1;
  }

  .post-keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .keyword-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: var(--accent-light);
    color: var(--accent-color);
    border-radius: 12px;
    font-weight: 500;
  }

  .read-more {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent-color);
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    transition: gap 0.2s ease;
  }

  .post-card:hover .read-more {
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .blog-hero {
      padding: 6rem 0 3rem;
    }

    .posts-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .post-image {
      height: 200px;
    }
  }
</style>
