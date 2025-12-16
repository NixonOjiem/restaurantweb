<template>
  <section class="w-full p-4 md:p-8 md:mt-8 lg:p-12 bg-linear-to-br from-[#FFFDF5] to-[#FFFAEB]"
    aria-label="Order and Reservation Hero">

    <div
      class="relative flex items-center justify-center w-full h-[80vh] min-h-[650px] md:max-h-[850px] overflow-hidden text-white shadow-2xl rounded-3xl group">

      <div class="absolute inset-0 z-0 w-full h-full bg-black">
        <div v-for="(img, index) in images" :key="index"
          class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          :class="currentImageIndex === index ? 'opacity-100' : 'opacity-0'">
          <img :src="img.src" :alt="img.alt"
            class="w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out will-change-transform"
            :class="currentImageIndex === index ? 'scale-105' : 'scale-100'" />
        </div>
        <div class="absolute inset-0 z-10 bg-black/50 mix-blend-multiply pointer-events-none"></div>
        <div class="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-transparent to-black/30 pointer-events-none">
        </div>
      </div>

      <div class="relative z-20 w-full max-w-6xl px-4 mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div class="text-center lg:text-left animate-fade-in-up">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold tracking-wider text-orange-300 uppercase border border-orange-300/30 rounded-full bg-orange-900/20 backdrop-blur-sm">
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Open for Service
          </div>

          <h1
            class="mb-6 font-serif text-5xl font-bold leading-none tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg">
            Craving <br />
            <span class="text-transparent bg-clip-text bg-linear-to-r from-orange-200 to-orange-500">Excellence?</span>
          </h1>

          <p class="max-w-xl mx-auto lg:mx-0 mb-8 font-sans text-lg text-gray-200/90 leading-relaxed drop-shadow-sm">
            Whether you want to dine in our ambiance or enjoy our flavors from your sofa, we are ready to serve.
          </p>

          <div class="hidden sm:flex gap-8 justify-center lg:justify-start border-t border-white/10 pt-8 mt-8">
            <div>
              <p class="text-3xl font-bold text-white">20m</p>
              <p class="text-xs text-gray-400 uppercase tracking-wide">Avg. Prep</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-white">4.9</p>
              <p class="text-xs text-gray-400 uppercase tracking-wide">Rating</p>
            </div>
          </div>
        </div>

        <div class="w-full max-w-md mx-auto lg:ml-auto">
          <div
            class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl overflow-hidden animate-fade-in-up delay-100">

            <div class="grid grid-cols-2 gap-2 p-1 bg-black/20 rounded-2xl mb-6">
              <button @click="activeTab = 'order'"
                class="py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                :class="activeTab === 'order' ? 'bg-white text-orange-900 shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Online
              </button>
              <button @click="activeTab = 'reserve'"
                class="py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                :class="activeTab === 'reserve' ? 'bg-white text-orange-900 shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/5'">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservations
              </button>
            </div>

            <div class="px-6 pb-6 pt-2">

              <div v-if="activeTab === 'order'" class="space-y-5">
                <div class="flex gap-4 mb-4">
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" name="orderType" value="delivery" v-model="orderType" class="peer sr-only">
                    <div
                      class="flex flex-col items-center justify-center p-4 border-2 border-white/10 rounded-xl bg-white/5 hover:bg-white/10 peer-checked:border-orange-400 peer-checked:bg-orange-500/20 transition-all">
                      <svg class="w-6 h-6 mb-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2" />
                      </svg>
                      <span class="text-sm font-medium text-white">Delivery</span>
                    </div>
                  </label>
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" name="orderType" value="pickup" v-model="orderType" class="peer sr-only">
                    <div
                      class="flex flex-col items-center justify-center p-4 border-2 border-white/10 rounded-xl bg-white/5 hover:bg-white/10 peer-checked:border-orange-400 peer-checked:bg-orange-500/20 transition-all">
                      <svg class="w-6 h-6 mb-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span class="text-sm font-medium text-white">Pickup</span>
                    </div>
                  </label>
                </div>

                <div v-if="orderType === 'delivery'" class="space-y-2">
                  <label class="text-xs uppercase tracking-wide text-white/70 font-semibold ml-1">Delivery
                    Location</label>
                  <div class="relative">
                    <input type="text" placeholder="Enter street address..."
                      class="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all">
                    <svg class="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                <router-link to="/menu"><button
                    class="w-full py-4 mt-2 font-bold text-white uppercase tracking-wider bg-linear-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg shadow-orange-900/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    Start Order
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button></router-link>
              </div>

              <div v-if="activeTab === 'reserve'" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="text-xs uppercase tracking-wide text-white/70 font-semibold ml-1">Date</label>
                    <input type="date"
                      class="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all [color-scheme:dark]">
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs uppercase tracking-wide text-white/70 font-semibold ml-1">Guests</label>
                    <select
                      class="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all appearance-none">
                      <option>2 People</option>
                      <option>3 People</option>
                      <option>4 People</option>
                      <option>5+ People</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="text-xs uppercase tracking-wide text-white/70 font-semibold ml-1">Time</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      class="py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-orange-500 hover:border-orange-500 transition-colors">18:00</button>
                    <button
                      class="py-2 text-sm border border-orange-500 bg-orange-500/20 rounded-lg text-white">19:00</button>
                    <button
                      class="py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-orange-500 hover:border-orange-500 transition-colors">20:00</button>
                  </div>
                </div>

                <button @click="handleReservation"
                  class="w-full py-4 mt-2 font-bold text-white uppercase tracking-wider bg-linear-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg shadow-orange-900/40 hover:brightness-110 active:scale-[0.98] transition-all">
                  Find a Table
                </button>

                <p class="text-center text-xs text-white/50 mt-2">Instant confirmation via SMS</p>
              </div>

            </div>
          </div>
        </div>

      </div>

      <button @click="scrollToContent"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce text-white/50 hover:text-white transition-colors">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref<'order' | 'reserve'>('order');
const orderType = ref<'delivery' | 'pickup'>('delivery');
const currentImageIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

// Replace with your actual food/interior shots
const images = [
  { src: '/487.webp', alt: 'Delicious plated food' },
  { src: '/486.png', alt: 'Restaurant Interior' },
  { src: '/488.avif', alt: 'Chef cooking' }
];

const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 5000);
};

const scrollToContent = () => {
  const element = document.getElementById('menu-details'); // Ensure this ID exists in your page
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleReservation = () => {
  console.log('Reservation logic here');
  // You can emit an event or call your API here
};

onMounted(() => {
  startSlideshow();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.delay-100 {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure date inputs look good in dark mode */
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
