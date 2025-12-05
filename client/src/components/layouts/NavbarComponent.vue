<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import logoSvg from '@/assets/Cuisine-Elegante.svg';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons/faBasketShopping';

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const route = useRoute();

// 1. REF FOR CLICK OUTSIDE LOGIC
const navbarRef = ref<HTMLElement | null>(null);
const profileDropdownRef = ref<HTMLElement | null>(null);

const isHomePage = computed(() => route.path === '/');
const isMenuOpen = ref(false);
const isProfileOpen = ref(false);
const isScrolled = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) isProfileOpen.value = false;
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value;
}

function handleLogout() {
  authStore.logout();
  isProfileOpen.value = false;
  isMenuOpen.value = false;
  router.push('/');
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 2. CLICK OUTSIDE LOGIC
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  if (isMenuOpen.value && navbarRef.value && !navbarRef.value.contains(target)) {
    isMenuOpen.value = false;
  }

  if (isProfileOpen.value && profileDropdownRef.value && !profileDropdownRef.value.contains(target)) {
    isProfileOpen.value = false;
  }
};

const navbarWrapperClasses = computed(() => {
  let classes = 'bg-stone-950/90 backdrop-blur-xl border border-stone-800 shadow-2xl mx-4 mt-4 rounded-2xl';
  classes += ' md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-t-0';

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

      <div ref="navbarRef" class="relative transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible"
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
                active-class="text-white active-link">Home</router-link>
              <router-link to="/menu"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white active-link">Menu</router-link>
              <router-link to="/about"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white active-link">About</router-link>
              <router-link to="/reservations"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white active-link">Reservations</router-link>
              <router-link to="/contact"
                class="nav-link text-stone-300 hover:text-white text-sm font-medium tracking-wide transition-colors"
                active-class="text-white active-link">Contact</router-link>
            </div>

            <div class="hidden md:flex items-center space-x-6">
              <button
                class="text-stone-300 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
                Book Now
              </button>
              <font-awesome-icon :icon="faBasketShopping"
                class="text-red-400 text-2xl hover:text-red-700 transition-colors duration-200 cursor-pointer"
                v-if="isAuthenticated" />
              <div class="h-4 w-px bg-white/20">
              </div>

              <div v-if="isAuthenticated" class="relative" ref="profileDropdownRef">

                <button @click="toggleProfile"
                  class="flex items-center gap-2 text-sm text-stone-300 hover:text-white transition-colors focus:outline-none">
                  <span>Hi, <span class="text-red-400 font-serif italic">{{ user?.name }}</span></span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform duration-200"
                    :class="isProfileOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                </button>

                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-2">
                  <div v-if="isProfileOpen"
                    class="absolute right-0 mt-4 w-48 bg-stone-950 border border-stone-800 rounded-xl shadow-xl py-2 overflow-hidden z-50">
                    <router-link to="/profile"
                      class="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
                      @click="isProfileOpen = false">
                      My Profile
                    </router-link>
                    <router-link to="/orders"
                      class="block px-4 py-2 text-sm text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
                      @click="isProfileOpen = false">
                      My Orders
                    </router-link>
                    <div class="h-px bg-stone-800 my-2"></div>
                    <button @click="handleLogout"
                      class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-stone-800 hover:text-red-300 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </transition>

              </div>

              <router-link to="/login" v-else
                class="group relative px-5 py-2 rounded-full bg-stone-100 text-stone-950 font-bold text-xs transition-all duration-300 hover:bg-red-600 hover:text-white overflow-hidden shadow-lg flex items-center justify-center">
                <span class="relative z-10 uppercase tracking-wide">Login</span>
              </router-link>
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

          <!-- Mobile navigation startts here -->

          <div class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
            :class="[isMenuOpen ? 'max-h-[600px] opacity-100 pb-6 border-t border-white/10 mt-2' : 'max-h-0 opacity-0 mt-0']">
            <div class="flex flex-col space-y-1 pt-4">
              <router-link to="/" class="mobile-link" @click="isMenuOpen = false">Home</router-link>
              <router-link to="/menu" class="mobile-link" @click="isMenuOpen = false">Menu</router-link>
              <router-link to="/about" class="mobile-link" @click="isMenuOpen = false">About</router-link>
              <router-link to="/reservations" class="mobile-link" @click="isMenuOpen = false">Reservations</router-link>
              <router-link to="/contact" class="mobile-link border-b border-stone-800 pb-4 mb-2"
                @click="isMenuOpen = false">Contact</router-link>

              <div class="pt-4 mt-2 flex flex-col gap-3 border-t border-white/5 mx-2">
                <button
                  class="w-full py-3 rounded-lg border border-white/10 text-stone-300 hover:border-red-500 hover:text-red-400 transition-colors text-xs uppercase tracking-widest font-bold">
                  Call Us
                </button>

                <router-link to="/login" v-if="!isAuthenticated"
                  class="w-full py-3 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors text-xs uppercase tracking-widest font-bold shadow-lg flex items-center justify-center">
                  Sign In
                </router-link>

                <div v-else class="flex flex-col gap-2">
                  <div class="text-center text-stone-500 text-xs uppercase tracking-widest mb-1">
                    Logged in as <span class="text-white font-bold">{{ user?.name }}</span>
                  </div>
                  <router-link to="/profile" @click="isMenuOpen = false"
                    class="w-full py-3 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors text-sm text-center font-bold uppercase tracking-wider">
                    My Profile
                  </router-link>
                  <button @click="handleLogout"
                    class="w-full py-3 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors text-sm font-bold uppercase tracking-wider">
                    Sign Out
                  </button>
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
/* Desktop Link Hover & Active State */
.nav-link {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}

/* This creates the red line */
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

/* Combined selector:
   1. Hover state
   2. Active state (using the custom class 'active-link' we added to the router-link active-class prop)
*/
.nav-link:hover::after,
.nav-link.active-link::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Mobile Link Styling */
.mobile-link {
  display: block;
  padding: 12px 16px;
  color: #d6d3d1;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ef4444;
  padding-left: 24px;
}
</style>
