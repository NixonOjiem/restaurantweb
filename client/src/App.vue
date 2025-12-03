<template>
  <SiteLoader v-if="isLoading" />

  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import SiteLoader from './components/loader/SiteLoader.vue';

const authStore = useAuthStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Define the minimum time you want the loader to show (e.g., 2000ms = 2 seconds)
    const minLoadTime = new Promise((resolve) => setTimeout(resolve, 2000));

    // Wait for BOTH the store initialization AND the timer to finish
    await Promise.all([
      authStore.initializeStore(),
      minLoadTime
    ]);

  } catch (error) {
    console.error('Failed to initialize application:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style>
/* Global styles: Ensure no body margin/padding interferes with 100vh/100vw */
body {
  margin: 0;
  padding: 0;
}
</style>
