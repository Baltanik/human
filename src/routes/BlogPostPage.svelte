<script>
  import { onMount } from 'svelte';
  import { getPostBySlug } from '../data/blog-posts.js';
  
  export let params = {};
  
  let post = null;
  let htmlContent = '';
  
  $: {
    if (params.slug) {
      post = getPostBySlug(params.slug);
      if (post) {
        // Convert markdown-style content to HTML (basic implementation)
        htmlContent = parseMarkdown(post.content);
      }
    }
  }
  
  onMount(() => {
    if (post) {
      updateSEO();
      injectStructuredData();
    }
  });

  function updateSEO() {
    if (!post) return;

    document.title = `${post.title} | Human`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      if (metaDesc instanceof HTMLMetaElement) {
        metaDesc.name = 'description';
      }
      document.head.appendChild(metaDesc);
    }
    if (metaDesc instanceof HTMLMetaElement) {
      metaDesc.content = post.description;
    }

    // Open Graph tags
    updateMetaTag('og:title', post.title);
    updateMetaTag('og:description', post.description);
    updateMetaTag('og:type', 'article');
    updateMetaTag('og:image', window.location.origin + post.ogImage);
    updateMetaTag('article:published_time', post.date);
    updateMetaTag('article:author', post.author);
  }

  function injectStructuredData() {
    if (!post) return;

    // Remove existing structured data if any
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) existing.remove();

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": window.location.origin + post.ogImage,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://linkedin.com/in/arturobueno"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Human Marketing Agency",
        "logo": {
          "@type": "ImageObject",
          "url": window.location.origin + "/values.png"
        }
      },
      "keywords": post.keywords.join(', '),
      "articleBody": post.content
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

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

  function parseMarkdown(content) {
    if (!content) return '';
    
    let html = content
      // Headers
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Checkboxes
      .replace(/- \[ \] (.*$)/gim, '<div class="checkbox"><input type="checkbox" disabled> $1</div>')
      .replace(/- \[x\] (.*$)/gim, '<div class="checkbox"><input type="checkbox" checked disabled> $1</div>')
      // Paragraphs (simple)
      .split('\n\n')
      .map(para => {
        para = para.trim();
        if (!para) return '';
        if (para.startsWith('<h') || para.startsWith('<div')) return para;
        return `<p>${para}</p>`;
      })
      .join('\n');
    
    return html;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  {#if post}
    <title>{post.title} | Human</title>
    <meta name="description" content={post.description}>
    <meta name="keywords" content={post.keywords.join(', ')}>
  {:else}
    <title>Article Not Found | Human</title>
  {/if}
</svelte:head>

{#if post}
  <article class="blog-post">
    <div class="post-header">
      <div class="container-narrow">
        <a href="#/blog" class="back-link">← Back to Blog</a>
        
        <div class="post-meta">
          <span class="post-date">{formatDate(post.date)}</span>
          <span class="divider">•</span>
          <span class="read-time">{post.readTime}</span>
        </div>
        
        <h1>{post.title}</h1>
        <p class="post-lead">{post.description}</p>
        
        <div class="author-bar">
          <div class="author-info">
            <img src="/1614590410625.jpeg" alt={post.author} class="author-avatar" />
            <div>
              <div class="author-name">{post.author}</div>
              <div class="author-title">Senior Performance Marketing Consultant</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="post-image-hero">
      <div class="container-narrow">
        <img src={post.ogImage} alt={post.title} />
      </div>
    </div>

    <div class="post-body">
      <div class="container-narrow">
        <div class="content">
          {@html htmlContent}
        </div>

        <div class="post-footer">
          <div class="keywords-section">
            <h4>Topics Covered</h4>
            <div class="keywords-list">
              {#each post.keywords as keyword}
                <span class="keyword-tag">{keyword}</span>
              {/each}
            </div>
          </div>

          <div class="cta-section">
            <h3>Need Expert Help?</h3>
            <p>If you're spending $20k+/month on paid media and want strategic guidance from someone who's managed 6-figure budgets, let's talk.</p>
            <a href="#/book-a-call" class="btn-primary">Book a Strategy Call</a>
          </div>

          <div class="navigation-section">
            <a href="#/blog" class="btn-outline">← Back to All Articles</a>
            <button on:click={scrollToTop} class="btn-outline">↑ Back to Top</button>
          </div>
        </div>
      </div>
    </div>
  </article>
{:else}
  <div class="not-found">
    <div class="container-narrow">
      <h1>Article Not Found</h1>
      <p>Sorry, we couldn't find that article.</p>
      <a href="#/blog" class="btn-primary">Back to Blog</a>
    </div>
  </div>
{/if}

<style>
  .blog-post {
    background: white;
  }

  .post-header {
    padding: 8rem 0 3rem;
    background: linear-gradient(180deg, #fafafa 0%, white 100%);
  }

  .container-narrow {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: none;
    margin-bottom: 2rem;
    transition: color 0.2s ease;
  }

  .back-link:hover {
    color: var(--accent-color);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .divider {
    color: rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.15;
    color: var(--text-color);
    margin-bottom: 1.25rem;
    letter-spacing: -0.02em;
  }

  .post-lead {
    font-size: 1.25rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .author-bar {
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-name {
    font-weight: 600;
    color: var(--text-color);
    font-size: 1rem;
  }

  .author-title {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .post-image-hero {
    padding: 3rem 0;
    background: white;
  }

  .post-image-hero img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .post-body {
    padding: 3rem 0 6rem;
  }

  .content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color);
  }

  .content :global(h2) {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    color: var(--text-color);
    letter-spacing: -0.01em;
  }

  .content :global(h3) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .content :global(h4) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }

  .content :global(p) {
    margin-bottom: 1.5rem;
  }

  .content :global(strong) {
    font-weight: 600;
    color: var(--text-color);
  }

  .content :global(a) {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .content :global(a:hover) {
    color: #6665d2;
  }

  .content :global(.checkbox) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .content :global(.checkbox input) {
    margin: 0;
  }

  .post-footer {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid rgba(0, 0, 0, 0.08);
  }

  .keywords-section {
    margin-bottom: 3rem;
  }

  .keywords-section h4 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .keywords-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .keyword-tag {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    background: var(--accent-light);
    color: var(--accent-color);
    border-radius: 20px;
    font-weight: 500;
  }

  .cta-section {
    background: linear-gradient(135deg, var(--accent-color), #a09fe6);
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }

  .cta-section h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .cta-section p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.95;
  }

  .btn-primary {
    display: inline-block;
    padding: 1rem 2rem;
    background: white;
    color: var(--accent-color);
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .navigation-section {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-outline {
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: var(--text-color);
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 0.95rem;
  }

  .btn-outline:hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  .not-found {
    padding: 8rem 0;
    text-align: center;
  }

  .not-found h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .not-found p {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .post-header {
      padding: 6rem 0 2rem;
    }

    .container-narrow {
      padding: 0 1.5rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    .post-lead {
      font-size: 1.1rem;
    }

    .content {
      font-size: 1rem;
    }

    .content :global(h2) {
      font-size: 1.5rem;
    }

    .content :global(h3) {
      font-size: 1.25rem;
    }

    .cta-section {
      padding: 2rem 1.5rem;
    }

    .cta-section h3 {
      font-size: 1.5rem;
    }

    .navigation-section {
      flex-direction: column;
    }

    .btn-outline {
      width: 100%;
    }
  }
</style>
