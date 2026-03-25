<script>
  import Reveal from './Reveal.svelte';
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let ctx;
  let animationFrame;
  let width, height;

  const LINE_COUNT = 32;
  const ACCENT_COLOR_RGB = '119, 118, 226';
  const SPEED = 0.005;
  let time = 0;

  function resize() {
    if (canvas) {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += SPEED;
    ctx.lineWidth = 1;

    for (let j = 0; j < 3; j++) {
      const groupOffset = j * Math.PI * 2 / 3;
      for (let i = 0; i < LINE_COUNT; i++) {
        ctx.beginPath();
        const alpha = (i / LINE_COUNT) * 0.2 + 0.04;
        ctx.strokeStyle = `rgba(${ACCENT_COLOR_RGB}, ${alpha})`;

        for (let x = 0; x < width; x += 5) {
          const yOffset = height / 2;
          const wave1 = Math.sin(x * 0.002 + time + groupOffset + i * 0.05) * 100;
          const wave2 = Math.sin(x * 0.005 - time + i * 0.05) * 50;
          const wave3 = Math.sin(x * 0.01 + time * 0.5) * 20;
          const spread = (i - LINE_COUNT/2) * 5;
          const y = yOffset + wave1 + wave2 + wave3 + spread;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
    animationFrame = requestAnimationFrame(animate);
  }

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '6-Fig', label: 'Monthly Budgets' },
    { value: '9', label: 'Global Brands' },
    { value: '4', label: 'Languages Spoken' }
  ];

  const platforms = [
    { name: 'Google Ads', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>' },
    { name: 'Meta', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
    { name: 'TikTok', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>' },
    { name: 'LinkedIn', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
    { name: 'Microsoft Ads', svg: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z"/></svg>' }
  ];

  onMount(() => {
    if (typeof window !== 'undefined') {
      ctx = canvas.getContext('2d');
      window.addEventListener('resize', resize);
      resize();
      animate();
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<section class="hero">
  <canvas bind:this={canvas} class="hero-canvas"></canvas>
  
  <div class="container hero-content">
    <Reveal>
      <h1>Turn Ad Spend <br>Into <span>Revenue.</span></h1>
    </Reveal>
    <Reveal delay={150}>
      <p class="subtitle">10 years of Paid Media Expertise. From Strategy to Success. I help businesses to scale profitably through paid advertising and digital marketing.</p>
    </Reveal>
    <Reveal delay={300}>
      <div class="actions">
        <a href="#/book-a-call" class="btn btn-primary">Let's Talk</a>
        <a href="#process" class="btn btn-outline">See How It Works</a>
      </div>
    </Reveal>

    <Reveal delay={450}>
      <div class="hero-stats">
        {#each stats as stat}
          <div class="stat-item">
            <span class="stat-value">{stat.value}</span>
            <span class="stat-label">{stat.label}</span>
          </div>
        {/each}
      </div>
    </Reveal>

    <Reveal delay={600}>
      <div class="hero-platforms">
        <span class="platforms-label">Platforms I work with:</span>
        <div class="platforms-grid">
          {#each platforms as platform}
            <div class="platform-item" title={platform.name}>
              {@html platform.svg}
            </div>
          {/each}
        </div>
      </div>
    </Reveal>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: calc(var(--header-height) + 4rem) 0 6rem;
    background-color: var(--bg-color);
  }

  .hero-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 900px;
    pointer-events: auto;
  }

  h1 {
    font-size: clamp(2.8rem, 7vw, 5rem);
    font-weight: 800;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
    color: var(--text-color);
  }
  
  h1 span {
    color: var(--accent-color);
    background: linear-gradient(120deg, var(--accent-color), #a09fe6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 4rem;
  }

  .btn {
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background: var(--accent-color);
    color: white;
    box-shadow: 0 4px 14px rgba(119, 118, 226, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(119, 118, 226, 0.5);
    background: #6665d2;
    color: white;
  }

  .btn-outline {
    background: transparent;
    color: var(--text-color);
    border: 2px solid var(--text-color);
  }

  .btn-outline:hover {
    background: var(--text-color);
    color: white;
  }

  /* Integrated Stats */
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .stat-item {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 800;
    color: var(--accent-color);
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }

  /* Integrated Platforms */
  .hero-platforms {
    text-align: center;
  }

  .platforms-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }

  .platforms-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    flex-wrap: wrap;
  }

  .platform-item {
    width: 32px;
    height: 32px;
    color: #666;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  .platform-item:hover {
    color: var(--accent-color);
    opacity: 1;
    transform: scale(1.1);
  }

  .platform-item :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 100svh;
      justify-content: center;
      padding: calc(var(--header-height) + 1.5rem) 0 2.5rem;
    }

    h1 {
      font-size: 2.6rem;
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.05rem;
      margin-bottom: 2rem;
      line-height: 1.65;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }

    .btn {
      width: 100%;
      text-align: center;
      padding: 1rem 1.5rem;
      font-size: 1.05rem;
    }

    /* Stats: griglia 2x2 ben leggibile */
    .hero-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem 1rem;
      margin-bottom: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(0,0,0,0.07);
    }

    .stat-value {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.72rem;
      letter-spacing: 0.04em;
    }

    /* Piattaforme */
    .platforms-label {
      font-size: 0.72rem;
      margin-bottom: 0.85rem;
    }

    .platforms-grid {
      gap: 1.25rem;
    }

    .platform-item {
      width: 26px;
      height: 26px;
    }
  }

</style>
