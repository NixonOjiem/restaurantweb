<template>
    <aside class="float-start h-screen py-6 px-6 sticky top-0 flex flex-col transition-all duration-300 ease-in-out"
        :class="isCollapsed ? 'w-[110px]' : 'w-72'">
        <div class="h-full flex flex-col p-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">

            <div class="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-3xl pointer-events-none"></div>

            <!-- Sidenav Header -->
            <div class="flex items-center  w-full  z-10" :class="isCollapsed? 'justify-center': 'justify-between'">
                <div v-if="!isCollapsed" class="flex items-center gap-3 overflow-hidden" >
                    <img :src="logoSvg" alt="Cuisine Elegante Logo" class="w-8 h-8 object-contain" />
                    <span class="font-bold text-xl text-indigo-400 tracking-wide whitespace-nowrap">
                      Admin
                    </span>
                </div>

                <button @click="toggleSidebar"
                    class="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                    <svg class="w-5 h-5 transition-transform duration-300" :class="isCollapsed ? 'rotate-180' : ''"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <!-- Navlinks -->
            <nav class="flex-1 my-6 space-y-2 overflow-y-auto z-10 custom-scrollbar">
                <div v-for="(category, index) in menuStructure" :key="index" class="mb-6">

                   <p v-if="!isCollapsed && category.label"
                        class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-opacity duration-300">
                        {{ category.label }}
                    </p>
                    <hr v-else class="mb-3 border-slate-700" />
                    <ul>
                        <li v-for="item in category.items" :key="item.name">
                            <router-link
                                :to="item.url"
                                class="relative flex  items-center p-2 rounded-xl transition-all duration-300 group overflow-hidden text-slate-400 hover:bg-white/5 hover:text-indigo-300"
                                active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-red-600"
                            >
                                <component :is="item.icon" class="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                                <span class="ml-3 font-medium whitespace-nowrap transition-all duration-300"
                                    :class="isCollapsed ? 'opacity-0 w-0 translate-x-10' : 'opacity-100 w-auto translate-x-0'">
                                    {{ item.name }}
                                </span>
                            </router-link>
                        </li>
                    </ul>


                    <!-- <ul>
                        <li v-for="item in category.items" :key="item.name">
                            <a href="#" @click.prevent="activeItem = item.name"
                                class="relative flex items-center p-3 rounded-xl transition-all duration-300 group overflow-hidden"
                                :class="activeItem === item.name
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-indigo-300'">
                                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-white transition-all duration-300"
                                    :class="activeItem === item.name ? 'opacity-100' : 'opacity-0 -translate-x-full'">
                                </div>

                                <component :is="item.icon"
                                    class="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                                <span class="ml-3 font-medium whitespace-nowrap transition-all duration-300"
                                    :class="isCollapsed ? 'opacity-0 w-0 translate-x-10' : 'opacity-100 w-auto translate-x-0'">
                                    {{ item.name }}
                                </span>

                                <div v-if="isCollapsed"
                                    class="absolute left-full ml-4 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                    {{ item.name }}
                                </div>
                            </a>
                        </li>
                    </ul> -->
                </div>
            </nav>

            <!-- User Footer -->
            <div class=" border-t pt-4 flex border-white/5 z-10" :class="isCollapsed? 'justify-center': ''">
              <div class="flex gap-2">
                 <!-- Avatar -->
                  <img src="https://i.pravatar.cc/150?img=33" alt="User"
                  class="w-10 h-10 rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition-colors">
                  <div class="overflow-hidden transition-all duration-300"
                        :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'">
                        <p class="text-sm font-semibold text-white truncate">Alex Morgan</p>
                        <p class="text-xs text-slate-500 truncate">Admin</p>
                    </div>

                    <log-out v-if="!isCollapsed" class=" w-10 text-red-500"/>
               </div>

            </div>

        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logoSvg from '@/assets/Cuisine-Elegante.svg';
import { ClipboardList, LayoutDashboard, LogOut, Settings, ShoppingCart, Users, UtensilsCrossed } from 'lucide-vue-next';


// --- State ---
const isCollapsed = ref(false);

// --- Configuration ---
const menuStructure = [
    {
        label: 'Overview',
        items: [
            { name: 'Dashboard', icon: LayoutDashboard, url: '/admin/dashboard' },
        ],
    },
    {
        label: 'Management',
        items: [
            { name: 'Users', icon: Users, url: '/admin/users' },
            { name: 'Orders', icon: ClipboardList, url: '/admin/orders' },
            {name: 'Menu Items', icon: UtensilsCrossed, url: '/admin/menu-items'},
            { name: 'Carts', icon: ShoppingCart, url: '/admin/carts' }

        ],
    },
    {
        label: 'System',
        items: [
            { name: 'Settings', icon: Settings, url: '/admin/settings' },
        ]
    },
];

// --- Actions ---
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
/* Custom scrollbar for the nav area
  Keeps it sleek and hidden until hovered/needed
*/
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
}
</style>
