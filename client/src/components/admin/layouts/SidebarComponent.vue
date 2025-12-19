<template>
  <aside
    class="h-screen bg-slate-50/50 py-5 px-5 sticky top-0 flex flex-col transition-all duration-500 ease-in-out z-999"
    :class="isCollapsed ? 'w-[115px]' : 'w-80'"
  >
    <div class="h-full flex flex-col bg-[#05050a] border border-white/8 rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden relative">

      <div class="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none"></div>

      <div class="p-8 flex items-center gap-4 transition-all duration-500" :class="isCollapsed ? 'justify-center' : ''">
        <div class="relative shrink-0">
          <div class="absolute -inset-2 bg-indigo-500/20 blur-lg rounded-full animate-pulse"></div>
          <img :src="logoSvg" alt="Logo" class="w-9 h-9 relative z-10 brightness-0 invert" />
        </div>

        <div v-if="!isCollapsed" class="overflow-hidden whitespace-nowrap">
          <h1 class="text-white font-bold tracking-[0.15em] text-base uppercase leading-none">Cuisine</h1>
          <div class="h-0.5 w-8 bg-indigo-500 mt-2"></div>
        </div>
      </div>

      <nav class="flex-1 px-4 py-2 space-y-10 overflow-y-auto no-scrollbar z-10">
        <div v-for="(category, index) in menuStructure" :key="index">
          <p v-if="!isCollapsed" class="px-4 text-[10px] font-black text-indigo-500/50 uppercase tracking-[0.4em] mb-6">
            {{ category.label }}
          </p>
          <div v-else class="h-px w-full bg-white/5 mb-6"></div>

          <ul class="space-y-2">
            <li v-for="item in category.items" :key="item.name">
              <router-link :to="item.url"
                class="group relative flex items-center py-3.5 rounded-xl transition-all duration-300 text-slate-400 hover:text-white"
                :class="isCollapsed ? 'justify-center px-0' : 'px-4'"
                active-class="nav-active"
              >
                <div class="absolute inset-0 bg-indigo-600 rounded-xl opacity-0 group-[.nav-active]:opacity-100 shadow-[0_10px_25px_rgba(79,70,229,0.4)] transition-all duration-300"
                     :class="isCollapsed ? 'w-12 mx-auto' : 'w-full'"></div>

                <component :is="item.icon"
                  class="w-5 h-5 z-10 shrink-0 transition-transform duration-300 group-hover:scale-110 group-[.nav-active]:text-white"
                />

                <span v-if="!isCollapsed" class="ml-4 text-[13px] font-semibold tracking-wide z-10 transition-all duration-500">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mt-auto p-4 border-t border-white/5 z-10">
        <button @click="toggleSidebar"
          class="w-full mb-4 py-3 flex items-center justify-center rounded-xl bg-white/3 hover:bg-white/8 border border-white/5 transition-all text-slate-400 hover:text-white group">
          <svg class="w-5 h-5 transition-transform duration-500" :class="isCollapsed ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <span v-if="!isCollapsed" class="ml-3 text-[11px] font-bold uppercase tracking-[0.2em]">Collapse</span>
        </button>

        <div class="group/profile relative flex items-center gap-3 p-2 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 cursor-pointer transition-all duration-500 hover:bg-indigo-600/10 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(79,70,229,0.2)]"
             :class="isCollapsed ? 'justify-center' : ''">

          <div class="relative shrink-0">
            <img src="https://i.pravatar.cc/150?img=33" class="w-9 h-9 rounded-lg object-cover ring-2 ring-indigo-500/20 group-hover/profile:ring-indigo-500 transition-all duration-500" />
            <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#05050a]"></div>
          </div>

          <div v-if="!isCollapsed" class="flex flex-col min-w-0">
            <span class="text-white text-xs font-bold truncate group-hover/profile:text-indigo-200 transition-colors">{{ userName }}</span>
            <span class="text-indigo-400 text-[9px] font-medium uppercase tracking-tighter">System Admin</span>
          </div>

          <button v-if="!isCollapsed" @click="handleLogout" class="ml-auto p-1.5 text-slate-500 hover:text-rose-500 transition-all hover:scale-110">
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import logoSvg from '@/assets/Cuisine-Elegante.svg';
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  UtensilsCrossed
} from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const isCollapsed = ref(false);
const authStore = useAuthStore();
const userName = computed(() => authStore.user?.name || 'Admin User');

const menuStructure = [
  {
    label: 'Overview',
    items: [{ name: 'Dashboard', icon: LayoutDashboard, url: '/admin/dashboard' }],
  },
  {
    label: 'Management',
    items: [
      { name: 'Users', icon: Users, url: '/admin/users' },
      { name: 'Orders', icon: ClipboardList, url: '/admin/orders' },
      { name: 'Menu Items', icon: UtensilsCrossed, url: '/admin/menu-items' },
      { name: 'Carts', icon: ShoppingCart, url: '/admin/carts' }
    ],
  },
  {
    label: 'System',
    items: [{ name: 'Settings', icon: Settings, url: '/admin/settings' }],
  },
];

const toggleSidebar = () => { isCollapsed.value = !isCollapsed.value; };
const handleLogout = () => { console.log("Logging out..."); };
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.nav-active { color: white !important; }

/* Refined Glow for Collapsed vs Expanded */
.nav-active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 12px 12px 0 0;
  z-index: 5;
}
</style>
