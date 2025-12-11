<template lang="html">
  <div class="test">
    Dashboard component
  </div>
</template>
<script setup lang="ts">
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const getAllOrdersUrl = `${baseUrl}/orders/admin-orders`;
</script>
<style lang="css" scoped></style>
