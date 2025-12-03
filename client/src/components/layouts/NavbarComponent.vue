<script setup lang="ts">
import { ref, defineOptions, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import logoSvg from '@/assets/Cuisine-Elegante.svg';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

defineOptions({
  name: "NavbarComponent",
});

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const route = useRoute();

// 1. REF FOR CLICK OUTSIDE LOGIC
const navbarRef = ref<HTMLElement | null>(null);

const isHomePage = computed(() => route.path === '/');
const isMenuOpen = ref(false);
const isScrolled = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 2. CLICK OUTSIDE LOGIC
const handleClickOutside = (event: MouseEvent) => {
  if (!isMenuOpen.value) return;
  if (navbarRef.value && !navbarRef.value.contains(event.target as Node)) {
    isMenuOpen.value = false;
  }
};

const navbarWrapperClasses = computed(() => {
  // MOBILE BASE: Darker background (90%) for readability, Floating Card style
  let classes = 'bg-stone-950/90 backdrop-blur-xl border border-stone-800 shadow-2xl mx-4 mt-4 rounded-2xl';

  // DESKTOP RESET: Remove margins and rounded corners
  classes += ' md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-t-0';

  // DESKTOP STATE
  if (isHomePage.value && !isScrolled.value) {
    classes += ' md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-b-transparent';
  } else {
    classes += ' md:bg-stone-950/60 md:backdrop-blur-xl md:shadow-lg md:border-b-white/10';
  }

  return classes;
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="w-full relative z-50">

    <header class="fixed top-0 left-0 w-full transition-all duration-500 ease-in-out font-sans">

      <div ref="navbarRef" class="relative transition-all duration-300 ease-in-out overflow-hidden"
        :class="navbarWrapperClasses">
        <nav class="max-w-7xl mx-auto px-6">

          <div class="flex items-center justify-between py-3">

            <router-link to="/" class="flex items-center gap-3 group cursor-pointer" @click="isMenuOpen = false">
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br from-red-600 to-red-900 p-0.5 shadow-lg shadow-red-900/20 transition-transform duration-300 group-hover:scale-105">
                <div
                  class="w-full h-full bg-stone-950 rounded-full flex items-center justify-center border border-white/10">
                  <img :src="logoSvg" alt="Logo" class="w-5 h-5 object-contain" />
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-serif font-bold text-white leading-none tracking-wide drop-shadow-md">
                  Cuisine
                </span>
                <span class="text-[9px] text-red-500 font-bold tracking-[0.25em] uppercase mt-0.5">
                  Elegante
                </span>
              </div>
            </router-link>

            <div class="hidden md:flex items-center space-x-8">
              <router-link to="/"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white">Home</router-link>
              <router-link to="/menu"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white">Menu</router-link>
              <router-link to="/about"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white">About</router-link>
              <router-link to="/reservations"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white">Reservations</router-link>
              <router-link to="/contact"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white">Contact</router-link>
            </div>

            <div class="hidden md:flex items-center space-x-6">
              <button
                class="text-stone-300 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
                Book Now
              </button>
              <div class="h-4 w-px bg-white/20"></div>

              <div v-if="isAuthenticated" class="flex items-center gap-3">
                <span class="text-sm text-stone-300">Hi, <span class="text-red-400 font-serif italic">{{ user?.name
                    }}</span></span>
              </div>

              <a href="/login" v-else
                class="group relative px-5 py-2 rounded-full bg-stone-100 text-stone-950 font-bold text-xs transition-all duration-300 hover:bg-red-600 hover:text-white overflow-hidden shadow-lg">
                <span class="relative z-10 uppercase tracking-wide">Login</span>
              </a>
            </div>

            <button @click="toggleMenu"
              class="md:hidden flex flex-col w-8 h-6 justify-between items-end group p-1 z-20 relative">
              <span class="h-0.5 bg-white rounded-full transition-all duration-300"
                :class="isMenuOpen ? 'w-6 rotate-45 translate-y-2.5 bg-red-500' : 'w-6'"></span>
              <span class="h-0.5 bg-white rounded-full transition-all duration-300"
                :class="isMenuOpen ? 'w-6 opacity-0' : 'w-4 group-hover:w-6'"></span>
              <span class="h-0.5 bg-white rounded-full transition-all duration-300"
                :class="isMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5 bg-red-500' : 'w-3 group-hover:w-6'"></span>
            </button>
          </div>

          <div class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
            :class="[isMenuOpen ? 'max-h-[500px] opacity-100 pb-6 border-t border-white/10 mt-2' : 'max-h-0 opacity-0 mt-0']">
            <div class="flex flex-col space-y-1 pt-4">
              <router-link to="/" class="mobile-link" @click="isMenuOpen = false">Home</router-link>
              <router-link to="/menu" class="mobile-link" @click="isMenuOpen = false">Menu</router-link>
              <router-link to="/about" class="mobile-link" @click="isMenuOpen = false">About</router-link>
              <router-link to="/reservations" class="mobile-link" @click="isMenuOpen = false">Reservations</router-link>
              <router-link to="/contact" class="mobile-link" @click="isMenuOpen = false">Contact</router-link>

              <div class="pt-4 mt-2 flex flex-col gap-3 border-t border-white/5 mx-2">
                <button
                  class="w-full py-3 rounded-lg border border-white/10 text-stone-300 hover:border-red-500 hover:text-red-400 transition-colors text-xs uppercase tracking-widest font-bold">
                  Call Us
                </button>
                <button v-if="!isAuthenticated"
                  class="w-full py-3 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors text-xs uppercase tracking-widest font-bold shadow-lg">
                  Sign In
                </button>
                <div v-else class="text-center text-stone-400 text-sm py-2">
                  Logged in as <span class="text-white">{{ user?.name }}</span>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </div>
    </header>

  </div>
</template>

<style scoped>
/* Desktop Link Hover Animation */
.nav-link {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #dc2626;
  /* red-600 */
  transform-origin: bottom right;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Mobile Link Styling */
.mobile-link {
  display: block;
  padding: 12px 16px;
  color: #d6d3d1;
  /* stone-300 */
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ef4444;
  /* red-500 */
  padding-left: 24px;
}
</style>