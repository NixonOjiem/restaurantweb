<template>
  <header class="w-full sticky top-0 z-20 flex justify-center p-4">
    <nav class="bg-white rounded-2xl shadow-xl p-4 w-full max-w-6xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-16 h-16 rounded-full flex items-center justify-center">
            <img :src="logoSvg" alt="Bistro Elegante Logo" class="w-14 h-14 text-white object-contain" />
          </div>
          <span class="text-2xl font-bold text-gray-800">Cuisine Élégante</span>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a href="#" class="nav-link-animated text-gray-700 font-medium hover:text-red-600 transition-colors">Home</a>
          <a href="#" class="nav-link-animated text-gray-700 font-medium hover:text-red-600 transition-colors">Menu</a>
          <a href="#" class="nav-link-animated text-gray-700 font-medium hover:text-red-600 transition-colors">About</a>
          <a href="#"
            class="nav-link-animated text-gray-700 font-medium hover:text-red-600 transition-colors">Reservations</a>
          <a href="#"
            class="nav-link-animated text-gray-700 font-medium hover:text-red-600 transition-colors">Contact</a>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <button
            class="px-4 py-2 rounded-full border border-[#2C3E50] text-[#2C3E50] font-medium hover:bg-[#2C3E50] hover:text-white transition-colors">
            Book Now
          </button>
          <a href="/login"
            class="px-6 py-2 rounded-full bg-[#2C3E50] text-white font-medium hover:bg-[#455566] transition-colors flex items-center">
            Get Started
          </a>
        </div>

        <button @click="toggleMenu"
          class="md:hidden flex flex-col w-6 h-5 justify-between items-center transition-all duration-300"
          :class="{ 'space-y-0': isMenuOpen }">
          <span class="w-full h-0.5 bg-gray-800 rounded transition-transform duration-300"
            :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-gray-800 rounded transition-opacity duration-300"
            :class="{ 'opacity-0': isMenuOpen }"></span>
          <span class="w-full h-0.5 bg-gray-800 rounded transition-transform duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
        </button>
      </div>

      <div v-show="isMenuOpen"
        class="mobile-menu md:hidden mt-4 pt-4 border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out"
        :class="{ 'max-h-96': isMenuOpen, 'max-h-0': !isMenuOpen }">
        <div class="flex flex-col space-y-4">
          <a href="#"
            class="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center hover:underline">Home</a>
          <a href="#"
            class="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center hover:underline">Menu</a>
          <a href="#"
            class="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center hover:underline">About</a>
          <a href="#"
            class="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center hover:underline">Reservations</a>
          <a href="#"
            class="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center hover:underline">Contact</a>

          <div class="pt-4 flex space-x-3">
            <button
              class="flex-1 px-4 py-3 rounded-lg border border-[#2C3E50] text-[#2C3E50] font-medium hover:bg-[#2C3E50] hover:text-white transition-colors flex items-center justify-center">
              Call
            </button>
            <button
              class="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
              Book
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="h-[72px]"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue';
import logoSvg from '@/assets/Cuisine-Elegante.svg';

defineOptions({
  name: "NavbarComponent",
});

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
.nav-link-animated {
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
  transform: translateZ(0);
}

.nav-link-animated::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 3px;
  bottom: 0;
  left: 0;
  background-color: red;
  transform-origin: bottom left;
  transition: transform 0.4s ease-out;
}

.nav-link-animated:hover::after {
  transform: scaleX(1);
}
</style>
