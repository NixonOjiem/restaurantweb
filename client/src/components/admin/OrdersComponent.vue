<template lang="html">
  <div>
    Orders component
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const token = authStore.token;
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const fetchOrdersUrl = `${apiUrl}/orders`;
</script>
<style lang="css"></style>
