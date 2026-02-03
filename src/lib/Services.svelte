<script>
  import { onMount } from 'svelte';

  let sectionElement;
  
  // Scroll & Dimensions
  let innerHeight = 0;
  let innerWidth = 0;

  // Logic State
  let progress = 0;
  
  // Configuration
  const TOTAL_NODES = 7;
  
  // Calcola quanto dobbiamo scrollare per completare l'animazione
  // IMPORTANTE: più alto = più controllo, ma scroll più lungo
  // Desktop: 125vw * 6 = 750vh di scroll
  // Mobile: 340vw * 5 = 1700vh di scroll
  $: isMobile = innerWidth < 768;
  $: translateAmount = isMobile ? 340 : 125;
  $: scrollMultiplier = isMobile ? 5 : 6; // Quanto scroll verticale per ogni vw orizzontale
  $: sectionHeight = translateAmount * scrollMultiplier; // In vh

  let ticking = false;

  function updateProgress() {
    if (!sectionElement || !innerHeight) return;
    
    const rect = sectionElement.getBoundingClientRect();
    const sectionHeightPx = sectionElement.offsetHeight;
    const scrollableDistance = sectionHeightPx - innerHeight;
    
    if (scrollableDistance <= 0) {
      progress = 0;
      return;
    }
    
    const scrolledIntoSection = -rect.top;
    const rawProgress = scrolledIntoSection / scrollableDistance;
    
    progress = Math.max(0, Math.min(1, rawProgress));
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  });

  function isNodeActive(index, currentProgress) {
    const nodePosition = 0.05 + (index / (TOTAL_NODES - 1)) * 0.9;
    return currentProgress >= nodePosition;
  }
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<section id="services" bind:this={sectionElement} style="height: {sectionHeight}vh;">
  <div class="sticky-wrapper">
    <div class="horizontal-mover" style="transform: translateX(-{progress * translateAmount}vw);">
      
      <!-- 1. Title Module -->
      <div class="module title-module">
        <h2>Our Process</h2>
        <p>A meticulous journey from audit to excellence.</p>
      </div>

      <!-- 2. The Timeline Track -->
      <div class="module track-module">
        
        <!-- The Line -->
        <div class="line-container">
          <div class="line-track"></div>
          <!-- Line fill width is driven by progress, relative to the track width -->
          <!-- We multiply progress by a factor if we want it to fill "faster" or "slower" than the scroll, 
               but usually matching the scroll movement feels most natural (1:1 physics). 
               Since the container moves LEFT, we want the line to fill RIGHT.
               If we map progress 0->1 to width 0->100%, it works if the track matches the scroll distance visually.
          -->
          <div class="line-fill" style="width: {progress * 100}%"></div>
        </div>

        <!-- The Nodes -->
        <div class="nodes-container">
          
          <!-- Node 1 -->
          <div class="node-item" class:active={isNodeActive(0, progress)}>
            <div class="circle">01</div>
            <div class="content">
              <h3>Audit</h3>
              <p>Deep dive technical & account analysis.</p>
            </div>
          </div>

          <!-- Node 2 -->
          <div class="node-item" class:active={isNodeActive(1, progress)}>
            <div class="circle">02</div>
            <div class="content">
              <h3>Plan</h3>
              <p>Strategic roadmap & budget allocation.</p>
            </div>
          </div>

          <!-- Node 3 -->
          <div class="node-item" class:active={isNodeActive(2, progress)}>
            <div class="circle">03</div>
            <div class="content">
              <h3>Setup</h3>
              <p>Campaign architecture & pixel perfection.</p>
            </div>
          </div>

          <!-- Node 4 -->
          <div class="node-item" class:active={isNodeActive(3, progress)}>
            <div class="circle">04</div>
            <div class="content">
              <h3>Track</h3>
              <p>Server-side tracking & analytics setup.</p>
            </div>
          </div>

          <!-- Node 5 -->
          <div class="node-item" class:active={isNodeActive(4, progress)}>
            <div class="circle">05</div>
            <div class="content">
              <h3>Launch</h3>
              <p>Go-live with controlled scaling.</p>
            </div>
          </div>
          
          <!-- Node 6 -->
          <div class="node-item" class:active={isNodeActive(5, progress)}>
            <div class="circle">06</div>
            <div class="content">
              <h3>Optimize</h3>
              <p>Daily data-driven refinements.</p>
            </div>
          </div>

          <!-- Node 7 -->
          <div class="node-item icon-node" class:active={isNodeActive(6, progress)}>
             <div class="circle">
               <!-- Checkmark or Star Icon -->
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <div class="content">
               <h3>Scale</h3>
               <p>Sustainable growth & CRO.</p>
             </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>

<style>
  section {
    position: relative;
    background-color: var(--bg-color);
    /* height is set inline via JS/VH constant */
  }

  .sticky-wrapper {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center; /* Vertically center the timeline */
  }

  .horizontal-mover {
    display: flex;
    align-items: center;
    padding-left: 10vw; /* Initial offset so title isn't jammed against edge */
    will-change: transform;
    /* No transition on transform! We want raw, instant control via scroll. */
  }

  .module {
    flex-shrink: 0;
  }

  /* --- Title Module --- */
  .title-module {
    width: 40vw; /* Takes up decent chunk of screen initially */
    margin-right: 5vw;
    opacity: 1;
    /* Optional: fade it out as it scrolls away? */
  }

  .title-module h2 {
    font-size: 5rem;
    letter-spacing: -0.03em;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .title-module p {
    font-size: 1.5rem;
    color: var(--text-muted);
    max-width: 400px;
  }

  /* --- Track Module --- */
  .track-module {
    position: relative;
    width: 180vw; /* The length of the timeline track */
  }

  /* Line Styles */
  .line-container {
    position: absolute;
    top: 50%; /* Center line vertically relative to Nodes? */
    /* Let's align it with the circles. */
    left: 0;
    width: 100%;
    height: 4px;
    transform: translateY(-50%);
    z-index: 0;
  }

  .line-track {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.05);
    border-radius: 4px;
  }

  .line-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--accent-color);
    box-shadow: 0 0 20px var(--accent-color);
    border-radius: 4px;
    /* Width set inline */
  }

  /* Nodes Container */
  .nodes-container {
    position: relative;
    display: flex;
    justify-content: space-between; /* Evenly distribute nodes along width */
    width: 100%;
    z-index: 1;
    /* Align items logic: The circles should sit on the line. */
  }

  .node-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px; /* Specific width for text centering */
    /* The circle is the anchor point */
  }

  .circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--bg-color);
    border: 2px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 2rem;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    z-index: 2;
  }

  .content {
    text-align: center;
    opacity: 0.3;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }

  .content h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .content p {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  /* Active State */
  .node-item.active .circle {
    border-color: var(--accent-color);
    background: var(--accent-color);
    color: white;
    box-shadow: 0 0 30px var(--accent-color);
    transform: scale(1.2);
  }

  .node-item.active .content {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Last node special styling if desired */
  .icon-node .circle svg {
    width: 28px;
    height: 28px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .title-module {
      width: 80vw;
      margin-right: 10vw;
    }
    
    .title-module h2 {
      font-size: 3.5rem;
    }

    .track-module {
      width: 350vw; /* Much longer on mobile to fit content */
    }
    
    .node-item {
      width: 150px; /* Narrower cols */
    }
    
    .circle {
      width: 50px;
      height: 50px;
      font-size: 1rem;
    }
  }
</style>
