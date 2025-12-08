<template>
  <div class="flex flex-col min-h-screen bg-[#FFFAEB]">
    <NavbarComponent />

    <main class="grow w-full">
      <ProfileCard />

      <div class="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-serif font-bold text-stone-800">Recent History</h2>
          <button class="text-sm font-semibold text-red-700 hover:text-red-800">View All</button>
        </div>

        <OrderHistoryList />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/layouts/NavbarComponent.vue';
import ProfileCard from '@/components/profilepage/ProfileCard.vue';
import OrderHistoryList from '@/components/profilepage/OrderHistoryList.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
</script>