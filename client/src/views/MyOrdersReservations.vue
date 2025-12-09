<template lang="html">
  <div>
    <NavbarComponent />
    <div class="grow">
      <OrdersReservation />
    </div>
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import OrdersReservation from '@/components/orders&reservation/OrdersReservation.vue';
</script>
<style lang="css" scoped></style>
