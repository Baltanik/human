<script>
  import Reveal from './Reveal.svelte';
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let ctx;
  let animationFrame;
  let width, height;

  const LINE_COUNT = 40;
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
        const alpha = (i / LINE_COUNT) * 0.5 + 0.1;
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
      <p class="subtitle">10 years of paid media expertise. From strategy to execution, I help businesses scale profitably across Google, Meta, TikTok & more.</p>
    </Reveal>
    <Reveal delay={300}>
      <div class="actions">
        <a href="#/book-a-call" class="btn btn-primary">Book a Strategy Call</a>
        <a href="#process" class="btn btn-outline">See How It Works</a>
      </div>
    </Reveal>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-top: var(--header-height);
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
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2rem;
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

  @media (max-width: 600px) {
    .actions {
      flex-direction: column;
      align-items: center;
    }
    .btn {
      width: 100%;
      max-width: 280px;
      text-align: center;
    }
  }
</style>
