<template lang="html">
  <div class="bg-linear-to-br from-[#FFFDF5] to-[#FFFAEB]">
    <NavbarComponent />
    <div class="grow">
      <ordersHeroSection />
      <OrdersReservation />
    </div>
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import OrdersReservation from '@/components/orders&reservation/OrdersReservation.vue';
import ordersHeroSection from '@/components/orders&reservation/ordersHeroSection.vue';
</script>
<style lang="css" scoped></style>
