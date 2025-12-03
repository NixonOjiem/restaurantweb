<template>
  <section class="w-full p-4 md:p-8 md:mt-8 lg:p-12 bg-linear-to-br from-[#FFFDF5] to-[#FFFAEB]"
    aria-label="Restaurant menu hero section">

    <div
      class="relative flex items-center justify-center w-full h-[75vh] min-h-[600px] md:max-h-[900px] overflow-hidden text-white shadow-2xl rounded-3xl md:rounded-3xl group">

      <div class="absolute inset-0 z-0 w-full h-full bg-black">
        <div v-for="(img, index) in images" :key="index"
          class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          :class="currentImageIndex === index ? 'opacity-100' : 'opacity-0'">
          <img :src="img.src" :alt="img.alt"
            class="w-full h-full object-cover object-center transition-transform duration-2000 ease-out will-change-transform"
            :class="currentImageIndex === index ? 'scale-105 group-hover:scale-110' : 'scale-100'" loading="eager" />
        </div>

        <div
          class="absolute inset-0 z-10 bg-linear-to-br from-black/70 via-black/40 to-black/20 mix-blend-multiply pointer-events-none">
        </div>
      </div>

      <div class="relative z-20 w-full max-w-7xl px-6 text-center">
        <div class="animate-fade-in-up">

          <span v-if="showSeasonalBadge"
            class="inline-block px-5 py-2 mb-8 text-sm font-semibold tracking-widest text-white uppercase shadow-sm rounded-full bg-linear-to-br from-orange-600 to-orange-400 animate-pulse">
            Seasonal Specials
          </span>

          <h1
            class="mb-4 font-serif text-4xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-linear-to-r from-white to-orange-100 drop-shadow-md md:text-6xl lg:text-7xl">
            Our Culinary Journey
          </h1>

          <p
            class="max-w-2xl mx-auto mb-12 font-sans text-lg font-light leading-relaxed text-white/95 md:text-2xl drop-shadow-sm">
            Explore a world of flavor, crafted with the freshest ingredients and passion.
          </p>

          <div class="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row md:gap-6">
            <a href="#menu-details"
              class="relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden font-semibold text-white transition-all transform rounded-full shadow-lg bg-linear-to-br from-[#c17a3a] to-[#a0522d] hover:-translate-y-1 hover:shadow-orange-900/30 group/btn">
              <div
                class="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover/btn:left-full">
              </div>

              <span class="relative">View Our Full Menu</span>
              <svg class="w-5 h-5 transition-transform duration-300 relative group-hover/btn:translate-x-1"
                viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-width="2" stroke-linecap="round" />
              </svg>
            </a>

            <button @click="scrollToReservations"
              class="inline-flex items-center gap-2 px-7 py-4 font-medium text-white transition-all transform border-2 border-white/30 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Reserve a Table
            </button>
          </div>

          <div
            class="flex flex-wrap justify-center gap-8 p-6 mx-auto border md:gap-16 max-w-4xl bg-white/10 backdrop-blur-md border-white/20 rounded-2xl md:p-8 mt-16">
            <div class="flex flex-col items-center">
              <span
                class="mb-2 font-serif text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400 md:text-4xl">50+</span>
              <span class="text-xs tracking-widest uppercase opacity-90">Signature Dishes</span>
            </div>
            <div class="flex flex-col items-center">
              <span
                class="mb-2 font-serif text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400 md:text-4xl">Local</span>
              <span class="text-xs tracking-widest uppercase opacity-90">Farm Sourced</span>
            </div>
            <div class="flex flex-col items-center">
              <span
                class="mb-2 font-serif text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400 md:text-4xl">4.9★</span>
              <span class="text-xs tracking-widest uppercase opacity-90">Guest Rating</span>
            </div>
          </div>
        </div>

        <div class="absolute top-1/2 right-[5%] -translate-y-1/2 hidden lg:block pointer-events-none">
          <div class="leaf-decoration opacity-30 w-24 h-24 bg-contain bg-no-repeat bg-center animate-float"></div>
          <div class="absolute -bottom-10 right-5 w-5 h-5 bg-white rounded-full opacity-30 animate-bounce"></div>
        </div>
      </div>

      <button @click="scrollToContent" aria-label="Scroll to menu"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-12 h-12 border-2 border-white/30 rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110 animate-bounce">
        <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showSeasonalBadge = ref(true);
const currentImageIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

// Images array for the shuffle effect
// Replace placeholder URLs with your actual image paths
const images = [
  { src: '/487.webp', alt: 'Chef preparing a gourmet dish' },
  { src: '/486.png', alt: 'Fresh ingredients on a table' },
  { src: '/488.avif', alt: 'Signature steak dish plating' }
];

const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 5000); // Changes every 5 seconds
};

const scrollToContent = () => {
  const element = document.getElementById('menu-details');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToReservations = () => {
  console.log('Scroll to reservations');
};

onMounted(() => {
  startSlideshow();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
/* Custom Keyframes are often cleaner in CSS than
  cluttering tailwind.config.js for single-component animations
*/

.animate-float {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" fill="%23ffffff" /></svg>');
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
