<template lang="html">
  <div>
    <NavbarComponent />
    <div class="grow">
      <MenuHeroSection />
      <MenuCards />
    </div>
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import MenuHeroSection from '@/components/menupage/MenuHeroSection.vue';
import MenuCards from '@/components/menupage/MenuCards.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
</script>
<style lang="css"></style>
