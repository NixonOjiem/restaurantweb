<template>
  <section class="flex flex-col min-h-screen">
    <RestaurantNavbar />

    <main class="grow">
      <h1 class="text-4xl p-10 text-center">Welcome to Cuisine Élégante!</h1>
      <p class="text-center p-5">This area is empty to push the footer down.</p>
    </main>

    <FooterComponent />
  </section>
</template>
<script setup lang="ts">
import RestaurantNavbar from '@/components/layouts/NavbarComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
</script>
