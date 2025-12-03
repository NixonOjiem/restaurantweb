<template>
  <SiteLoader v-if="isLoading" />

  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
// Import your loader component
import SiteLoader from './components/loader/SiteLoader.vue';// Adjust the path as needed

const authStore = useAuthStore();
// 1. Create a reactive state to track loading
const isLoading = ref(true);

onMounted(async () => {
  try {
    // 2. Await the asynchronous initialization of your store
    // Assuming initializeStore() returns a Promise or is an async function
    await authStore.initializeStore();

    // Optional: Load other initial data/resources here
    // await anotherStore.loadInitialData();

  } catch (error) {
    console.error('Failed to initialize application:', error);
    // Handle error state if necessary (e.g., redirect to an error page)
  } finally {
    // 3. Set isLoading to false when initialization is complete (success or failure)
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
