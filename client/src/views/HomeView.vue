<template>
  <section class="flex flex-col min-h-screen">
    <NavbarComponent />
    <main class="grow">
      <HeroSection />
      <AboutSection />
      <Events />
      <Gallery />
      <ReservationCta />
    </main>

    <FooterComponent />
  </section>
</template>
<script setup lang="ts">
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import HeroSection from '@/components/homepage/HeroSection.vue';
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import AboutSection from '@/components/homepage/AboutSection.vue';
import Events from '@/components/homepage/Events.vue';
import Gallery from '@/components/homepage/Gallery.vue';
import ReservationCta from '@/components/homepage/ReservationCta.vue';
</script>
