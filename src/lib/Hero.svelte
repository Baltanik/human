<script>
  import Reveal from './Reveal.svelte';
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let ctx;
  let animationFrame;
  let width, height;

  // Configuration
  const LINE_COUNT = 40;
  const ACCENT_COLOR_RGB = '119, 118, 226'; // #7776E2
  const SPEED = 0.005; // Very slow flow

  let time = 0;

  function init() {
    resize();
  }

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
    // Draw multiple overlapping sine waves to create the "ribbon" effect
    for (let j = 0; j < 3; j++) { // 3 main groups of waves
      
      const groupOffset = j * Math.PI * 2 / 3;
      
      for (let i = 0; i < LINE_COUNT; i++) {
        ctx.beginPath();
        
        // Varying opacity for depth
        const alpha = (i / LINE_COUNT) * 0.5 + 0.1;
        ctx.strokeStyle = `rgba(${ACCENT_COLOR_RGB}, ${alpha})`;

        // Moving lines
        for (let x = 0; x < width; x += 5) {
          // Complex wave function for organic look
          // y = Center + Amplitude * sin(Frequency * x + Phase)
          
          const yOffset = height / 2;
          
          const wave1 = Math.sin(x * 0.002 + time + groupOffset + i * 0.05) * 100;
          const wave2 = Math.sin(x * 0.005 - time + i * 0.05) * 50;
          const wave3 = Math.sin(x * 0.01 + time * 0.5) * 20;

          // Add some vertical spread based on line index 'i'
          const spread = (i - LINE_COUNT/2) * 5; 

          const y = yOffset + wave1 + wave2 + wave3 + spread;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
        ctx = canvas.getContext('2d');
        window.addEventListener('resize', () => {
          resize();
        });
        init();
        animate();
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', init);
        cancelAnimationFrame(animationFrame);
    }
  });
</script>

<section class="hero">
  <canvas bind:this={canvas} class="hero-canvas"></canvas>
  
  <div class="container hero-content">
    <Reveal>
      <h1>Tailored Strategies for <br><span>Unique Businesses.</span></h1>
    </Reveal>
    <Reveal delay={200}>
      <p>Our process involves thoroughly understanding your objectives and translating them into a comprehensive Media Plan designed to achieve those goals. We partner with you at any stage of your business journey, from initial validation to full-scale growth.</p>
    </Reveal>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 90vh; /* Keep it tall */
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
    pointer-events: none; /* Let clicks pass through if needed, but we capture mousemove on section */
  }

  .hero-content {
    position: relative;
    z-index: 2; /* Sit above canvas */
    text-align: center;
    max-width: 900px;
    pointer-events: auto; /* Ensure buttons are clickable */
  }

  h1 {
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 2rem;
    letter-spacing: -0.03em;
    color: var(--text-color);
  }
  
  /* Text gradient emphasis */
  h1 span {
    color: var(--accent-color);
    background: linear-gradient(120deg, var(--accent-color), #a09fe6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    color: var(--text-muted);
    margin-bottom: 3rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    background: rgba(255,255,255,0.8); /* Slight backdrop for legibility */
    backdrop-filter: blur(4px);
    padding: 1rem;
    border-radius: 8px;
  }

  .actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
