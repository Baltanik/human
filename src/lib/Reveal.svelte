<script>
  import { onMount } from 'svelte';
  
  export let threshold = 0.05;
  export let delay = 0;
  export let duration = 700;
  export let y = 18;
  
  let element;
  let isVisible = false;
  let observer;

  onMount(() => {
    // Fallback: if element is already in viewport or observer never fires, make visible after 2s
    const fallback = setTimeout(() => { isVisible = true; }, 2000);

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          clearTimeout(fallback);
          observer.unobserve(element);
        }
      });
    }, { threshold, rootMargin: '0px 0px 80px 0px' });

    observer.observe(element);

    return () => {
      clearTimeout(fallback);
      if (observer) observer.disconnect();
    };
  });
</script>

<div 
  bind:this={element} 
  class="reveal" 
  class:visible={isVisible}
  style="
    --delay: {delay}ms; 
    --duration: {duration}ms;
    --y: {y}px;
  "
>
  <slot />
</div>

<style>
  .reveal {
    opacity: 0;
    transform: translateY(var(--y));
    transition: opacity var(--duration) ease-out var(--delay), transform var(--duration) ease-out var(--delay);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
