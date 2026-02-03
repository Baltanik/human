<script>
  import { onMount } from 'svelte';
  
  export let threshold = 0.1;
  export let delay = 0;
  export let duration = 800;
  export let y = 20;
  
  let element;
  let isVisible = false;
  let observer;

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.unobserve(element);
        }
      });
    }, { threshold });

    observer.observe(element);

    return () => {
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
