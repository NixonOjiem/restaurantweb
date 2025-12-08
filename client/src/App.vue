<template>
  <!-- 1. The Loader -->
  <SiteLoader v-if="isLoading" />

  <!-- 2. The Application -->
  <!-- No specific wrapper div needed for Lenis -->
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import SiteLoader from './components/loader/SiteLoader.vue';

// GSAP Imports
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Import Lenis
import Lenis from 'lenis';

const authStore = useAuthStore();
const route = useRoute();
const isLoading = ref(true);

// Keep track of the Lenis instance
let lenis: Lenis | null = null;

onMounted(async () => {
  // Register GSAP plugins (ScrollSmoother is NO LONGER needed)
  gsap.registerPlugin(ScrollTrigger);

  // 1. Initialize Application Data
  try {
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 3000));

    await Promise.all([
      authStore.initializeStore(),
      minLoadTime
    ]);

  } catch (error) {
    console.error('Failed to initialize application:', error);
  } finally {
    isLoading.value = false;
  }

  // 2. Initialize Lenis (Smooth Scroll)
  // We can init this immediately; it will control the window scroll
  lenis = new Lenis({
    duration: 1.2, // The "weight" of the scroll (default is usually 1.2)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  // 3. Connect Lenis to GSAP ScrollTrigger
  // This ensures ScrollTrigger updates exactly when Lenis scrolls
  lenis.on('scroll', ScrollTrigger.update);

  // 4. Sync GSAP Ticker to Lenis
  // This is crucial for performance so they update on the same animation frame
  gsap.ticker.add((time) => {
    // lenis.raf expects time in milliseconds
    lenis?.raf(time * 1000);
  });

  // Disable lag smoothing in GSAP to prevent stuttering with Lenis
  gsap.ticker.lagSmoothing(0);
});

// --- ROUTE HANDLING ---
// When navigating to a new page, reset scroll to top
watch(
  () => route.path,
  async () => {
    if (lenis) {
      await nextTick();
      // 'immediate: true' prevents the slow smooth scroll animation to the top
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }
  }
);

onUnmounted(() => {
  // Cleanup
  if (lenis) {
    lenis.destroy();
    // Remove the ticker listener we added
    gsap.ticker.remove((time) => lenis?.raf(time * 1000));
  }
});
</script>

<style>
/* --- GLOBAL RESET --- */
body {
  margin: 0;
  padding: 0;
  width: 100%;
  /* Lenis usually works best with auto height on body */
  height: auto;
}

/* --- LENIS RECOMMENDED CSS --- */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
