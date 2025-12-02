<template>
  <section class="flex flex-col min-h-screen">
    <NavbarComponent />
    <main class="grow">
      <HeroSection />
    </main>

    <FooterComponent />
  </section>
</template>
<script setup lang="ts">
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import HeroSection from '@/components/homepage/HeroSection.vue';
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
</script>
