<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();
const adminUser = computed(() => authStore.user?.role === 'admin');

defineOptions({
  name: 'RestaurantFooter'
});

const currentYear = computed(() => new Date().getFullYear());

const quickLinks = [
  { name: 'Our Menu', href: '/menu' },
  { name: 'Reservations', href: '/reservation' },
  { name: 'Private Events', href: '#' },
  { name: 'Gift Cards', href: '#' },
  { name: 'Careers', href: '#' }
];
</script>

<template>
  <footer class="relative bg-stone-950 text-stone-300 font-sans overflow-hidden">

    <div class="absolute inset-0 opacity-[0.03]"
      style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>
    <div class="absolute -top-20 -left-20 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-3xl pointer-events-none">
    </div>
    <div
      class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-stone-800/20 rounded-full blur-3xl pointer-events-none">
    </div>

    <div class="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">

      <div class="relative rounded-2xl p-1 mb-20 bg-linear-to-r from-stone-800 via-red-900/50 to-stone-800 shadow-2xl">
        <div
          class="bg-stone-900/90 backdrop-blur-xl rounded-xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">

          <div class="text-center lg:text-left max-w-xl">
            <h3 class="text-3xl font-serif font-bold text-white mb-2 tracking-wide">
              Join the <span class="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-600">Inner
                Circle</span>
            </h3>
            <p class="text-stone-400 font-light leading-relaxed">
              Unlock the cellar. Receive invitation-only event details, secret menu drops, and exclusive
              sommelier selections.
            </p>
          </div>

          <div class="w-full lg:w-auto min-w-[350px]">
            <form class="relative group" @submit.prevent>
              <input type="email" placeholder="Enter your email address"
                class="w-full pl-6 pr-40 py-5 rounded-full bg-stone-950/80 border border-stone-700 text-stone-200 placeholder-stone-600 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-900/20 transition-all shadow-inner">
              <button
                class="absolute right-2 top-2 bottom-2 bg-linear-to-br from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-900/50 text-xs tracking-[0.15em] uppercase">
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800/50">

        <div class="space-y-8">
          <div class="flex items-center gap-5 group cursor-default">
            <div class="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <div
                class="absolute inset-0 bg-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              </div>
              <div
                class="relative w-full h-full bg-linear-to-br from-stone-800 to-stone-900 rounded-full border border-stone-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
              </div>
            </div>

            <div class="flex flex-col">
              <h2 class="text-3xl font-serif font-bold text-stone-100 leading-none tracking-wider">
                Cuisine
              </h2>
              <span
                class="text-xs text-red-500 font-bold tracking-[0.3em] uppercase mt-2 border-t border-red-900/50 pt-1">
                Elegante
              </span>
            </div>
          </div>

          <p class="text-stone-400 text-sm leading-relaxed font-light pl-2 border-l-2 border-stone-800">
            Where culinary art meets atmosphere. An experience designed for the senses.
          </p>

          <div class="flex space-x-4">
            <a v-for="icon in ['IG', 'FB', 'YT']" :key="icon" href="#"
              class="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300">
              <span class="text-[10px] font-bold">{{ icon }}</span>
            </a>
            <router-link v-if="adminUser" to="/admin"
              class="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8c-.519-.598-1.488-1-2.599-1m0 0C8.903 7 7.5 8.343 7.5 10s1.403 3 2.901 3m0-5c1.11 0 2.08.402 2.599 1m-5.198 4c-.519.598-1.488 1-2.599 1m0 0C8.903 15 7.5 16.343 7.5 18s1.403 3 2.901 3m0-5c1.11 0 2.08.402 2.599 1" />
              </svg>
            </router-link>
          </div>
        </div>

        <div>
          <h3 class="text-stone-100 font-serif font-bold text-lg mb-8 flex items-center gap-3">
            <span class="w-8 h-px bg-red-600"></span> Explore
          </h3>
          <ul class="space-y-4">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.href"
                class="group flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-red-500 transition-colors"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ link.name
                  }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-stone-100 font-serif font-bold text-lg mb-8 flex items-center gap-3">
            <span class="w-8 h-px bg-red-600"></span> Visit
          </h3>

          <ul class="space-y-6 mb-8">
            <li class="flex items-start group">
              <span class="text-red-500/80 mt-1 mr-4 text-lg group-hover:scale-110 transition-transform">📍</span>
              <span
                class="text-stone-400 text-sm font-light leading-relaxed group-hover:text-stone-200 transition-colors">
                123 Gourmet Avenue,<br>Culinary District, CD 10101
              </span>
            </li>
            <li class="flex items-start group">
              <span class="text-red-500/80 mt-1 mr-4 text-lg group-hover:scale-110 transition-transform">📞</span>
              <span
                class="text-stone-400 text-sm font-light group-hover:text-stone-200 transition-colors cursor-pointer">
                +1 (555) 123-4567
              </span>
            </li>
          </ul>

          <div class="p-4 rounded-xl bg-stone-900/50 border border-stone-800">
            <div class="flex justify-between text-xs text-stone-500 uppercase tracking-widest mb-2">
              <span>Dinner Service</span>
            </div>
            <div class="space-y-2 text-sm text-stone-300">
              <div class="flex justify-between"><span>Mon-Thu</span> <span>5pm - 10pm</span></div>
              <div class="flex justify-between font-medium text-white"><span>Fri-Sat</span> <span
                  class="text-red-400">5pm - 11pm</span></div>
              <div class="flex justify-between"><span>Sun</span> <span>4pm - 9pm</span></div>
            </div>
          </div>
        </div>

        <div class="flex flex-col h-full min-h-[260px]">
          <h3 class="text-stone-100 font-serif font-bold text-lg mb-8 flex items-center gap-3">
            <span class="w-8 h-px bg-red-600"></span> Locate
          </h3>

          <div class="grow w-full relative group rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
              class="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-in-out"
              alt="Map Location">

            <div class="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent">
            </div>

            <div class="absolute bottom-5 left-5 right-5 z-10">
              <button
                class="w-full bg-stone-100/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm py-3 rounded-xl hover:bg-red-700 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-1">
                Get Directions
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
        <p>&copy; {{ currentYear }} Cuisine Elegante. Crafted with <span class="text-red-800">♥</span> for food
          lovers.</p>
        <div class="flex gap-8">
          <a href="#" class="hover:text-stone-300 transition-colors">Privacy</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Terms</a>
          <a href="#" class="hover:text-stone-300 transition-colors">Sitemap</a>
        </div>
      </div>

    </div>
  </footer>
</template>
