<template lang="html">
  <div class="flex flex-col min-h-screen">
    <NavbarComponent />
    <main class="grow">
      <CartComponent />
    </main>
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import CartComponent from '@/components/cart/CartComponent.vue';
</script>
<style lang="">

</style>
