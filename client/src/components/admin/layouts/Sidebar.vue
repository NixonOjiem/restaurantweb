<template>
    <aside class="h-screen py-6 pl-6 pr-4 sticky top-0 flex flex-col transition-all duration-300 ease-in-out"
        :class="isCollapsed ? 'w-[100px]' : 'w-72'">
        <div
            class="h-full flex flex-col bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">

            <div class="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-3xl pointer-events-none"></div>

            <div class="flex items-center justify-between p-6 z-10">
                <div class="flex items-center gap-3 overflow-hidden" :class="{ 'w-0 opacity-0': isCollapsed }">
                    <div
                        class="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span class="font-bold text-xl text-white tracking-wide whitespace-nowrap">Nexus<span
                            class="text-indigo-400">Admin</span></span>
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

            <nav class="flex-1 px-4 space-y-2 overflow-y-auto z-10 custom-scrollbar">

                <div v-for="(category, index) in menuStructure" :key="index" class="mb-6">
                    <p v-if="!isCollapsed && category.label"
                        class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-opacity duration-300">
                        {{ category.label }}
                    </p>

                    <ul>
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
                    </ul>
                </div>
            </nav>

            <div class="p-4 border-t border-white/5 z-10">
                <button
                    class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group text-left">
                    <div class="relative shrink-0">
                        <img src="https://i.pravatar.cc/150?img=33" alt="User"
                            class="w-10 h-10 rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition-colors">
                        <span
                            class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    </div>

                    <div class="overflow-hidden transition-all duration-300"
                        :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'">
                        <p class="text-sm font-semibold text-white truncate">Alex Morgan</p>
                        <p class="text-xs text-slate-500 truncate">Pro Member</p>
                    </div>

                    <svg v-if="!isCollapsed"
                        class="ml-auto w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </svg>
                </button>
            </div>

        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';

// --- Icon Components (Inline for portability) ---
// In a real app, use a library like lucide-vue-next or heroicons
const IconGrid = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>` });
const IconUsers = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>` });
const IconCart = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>` });
const IconChart = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>` });
const IconSettings = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>` });
const IconMail = markRaw({ template: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>` });

// --- State ---
const isCollapsed = ref(false);
const activeItem = ref('Dashboard');

// --- Configuration ---
const menuStructure = [
    {
        label: 'Overview',
        items: [
            { name: 'Dashboard', icon: IconGrid },
            { name: 'Analytics', icon: IconChart },
        ]
    },
    {
        label: 'Management',
        items: [
            { name: 'Users', icon: IconUsers },
            { name: 'Orders', icon: IconCart },
            { name: 'Messages', icon: IconMail },
        ]
    },
    {
        label: 'System',
        items: [
            { name: 'Settings', icon: IconSettings },
        ]
    }
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