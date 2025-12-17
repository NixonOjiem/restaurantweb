<template lang="html">
  <div class="flex">
    <Sidebar />
    <router-view />
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/admin/layouts/SidebarComponent.vue';
</script>
