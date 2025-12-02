<script setup lang="ts">
import { defineOptions, computed } from 'vue';

defineOptions({
    name: 'RestaurantFooter'
});

const currentYear = computed(() => new Date().getFullYear());

const quickLinks = [
    { name: 'Our Menu', href: '#' },
    { name: 'Reservations', href: '#' },
    { name: 'Private Events', href: '#' },
    { name: 'Gift Cards', href: '#' },
    { name: 'Careers', href: '#' }
];
</script>

<template>
    <footer class="bg-linear-to-b from-stone-900 to-stone-950 text-stone-300 pt-24 pb-12 px-4 font-sans relative">
        <div class="max-w-7xl mx-auto">

            <div
                class="relative bg-linear-to-br from-red-900 via-red-800 to-stone-900 rounded-3xl p-8 md:p-12 mb-20 border border-red-500/20 shadow-2xl shadow-red-900/20 overflow-hidden group">

                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="text-center md:text-left max-w-lg">
                        <h3
                            class="text-3xl md:text-4xl font-serif font-bold mb-3 text-white tracking-wide drop-shadow-md">
                            Join the Inner Circle
                        </h3>
                        <p class="text-red-100/90 text-sm md:text-base leading-relaxed font-light">
                            Receive invitation-only event details, secret menu drops, and exclusive sommelier
                            selections.
                        </p>
                    </div>

                    <div class="w-full md:w-auto min-w-[340px] max-w-md">
                        <form class="relative flex items-center" @submit.prevent>
                            <input type="email" placeholder="Enter your email address"
                                class="w-full pl-6 pr-40 py-5 rounded-full bg-stone-900/40 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all shadow-inner backdrop-blur-md text-sm">
                            <button
                                class="absolute right-2 top-2 bottom-2 bg-white text-red-900 hover:bg-red-50 font-bold px-8 rounded-full transition-all duration-300 shadow-lg text-sm tracking-wider uppercase transform hover:scale-105">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div
                    class="absolute -top-24 -right-24 w-96 h-96 bg-red-500/30 rounded-full blur-[100px] group-hover:bg-red-400/40 transition-all duration-1000 mix-blend-screen">
                </div>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 pb-16 border-b border-stone-800">

                <div class="space-y-8">
                    <div class="flex items-center gap-5">
                        <div
                            class="w-16 h-16 shrink-0 rounded-full bg-linear-to-br from-red-600 to-red-800 p-0.5 flex items-center justify-center shadow-lg shadow-red-900/30">
                            <div
                                class="w-full h-full bg-stone-900 rounded-full flex items-center justify-center border border-white/5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-500" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                    <path d="M7 2v20" />
                                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                                </svg>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <h2
                                class="text-3xl font-serif font-bold text-white leading-none tracking-wider drop-shadow-sm">
                                Cuisine
                            </h2>
                            <span class="text-sm text-red-500 font-bold tracking-[0.25em] uppercase mt-1.5">
                                Elegante
                            </span>
                        </div>
                    </div>

                    <p class="text-stone-400 leading-relaxed text-sm font-light">
                        Experience the art of fine dining where culinary excellence meets sophisticated ambiance.
                    </p>

                    <div class="flex space-x-4">
                        <a v-for="item in ['IG', 'FB', 'TT']" :key="item" href="#"
                            class="w-11 h-11 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                            <span class="font-bold text-[10px] tracking-widest">{{ item }}</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3
                        class="text-lg text-white font-serif font-bold mb-8 tracking-wide border-l-4 border-red-600 pl-4">
                        Quick Links</h3>
                    <ul class="space-y-4">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href"
                                class="text-stone-400 hover:text-white text-sm transition-colors flex items-center gap-3 group">
                                <span
                                    class="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ link.name
                                    }}</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="text-lg text-white font-serif font-bold mb-8 tracking-wide border-l-4 border-red-600 pl-4">
                        Contact Info</h3>

                    <ul class="space-y-6 mb-8">
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-4 shrink-0 text-lg">📍</span>
                            <span class="text-stone-400 text-sm leading-relaxed font-light">
                                123 Gourmet Avenue,<br>Culinary District, CD 10101
                            </span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-4 shrink-0 text-lg">📞</span>
                            <span
                                class="text-stone-400 text-sm hover:text-white transition-colors cursor-pointer font-bold tracking-wide">
                                +1 (555) 123-4567
                            </span>
                        </li>
                    </ul>

                    <div class="bg-stone-800/50 p-5 rounded-xl border border-stone-700/50 backdrop-blur-sm">
                        <h4 class="text-[10px] font-bold text-red-400 mb-4 uppercase tracking-[0.2em]">Opening Hours
                        </h4>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between text-stone-400"><span>Mon - Thu</span> <span>5pm -
                                    10pm</span></div>
                            <div class="flex justify-between text-white font-medium border-t border-stone-700 pt-2">
                                <span>Fri - Sat</span> <span
                                    class="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">5pm - 11pm</span>
                            </div>
                            <div class="flex justify-between text-stone-400 border-t border-stone-700 pt-2">
                                <span>Sunday</span> <span>4pm - 9pm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col h-full min-h-[250px]">
                    <h3
                        class="text-lg text-white font-serif font-bold mb-8 tracking-wide border-l-4 border-red-600 pl-4">
                        Find Us</h3>
                    <div
                        class="grow w-full bg-stone-800 rounded-2xl overflow-hidden relative group border border-stone-700 hover:border-red-500/50 transition-colors shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                            class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            alt="Map">
                        <div class="absolute inset-0 bg-linear-to-t from-stone-900/90 via-stone-900/40 to-transparent">
                        </div>

                        <div class="absolute bottom-5 left-5 right-5">
                            <button
                                class="w-full text-sm font-bold text-white bg-red-700 hover:bg-red-600 backdrop-blur-md px-4 py-3.5 rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 group-hover:-translate-y-1 transition-all duration-300">
                                Get Directions <span class="text-lg leading-none">→</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-light">
                <div class="mb-4 md:mb-0">&copy; {{ currentYear }} Cuisine Elegante. All rights reserved.</div>
                <div class="flex gap-8">
                    <a href="#" class="hover:text-stone-300 transition-colors">Privacy</a>
                    <a href="#" class="hover:text-stone-300 transition-colors">Terms</a>
                    <a href="#" class="hover:text-stone-300 transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #1c1917;
    /* Stone 900 */
}

::-webkit-scrollbar-thumb {
    background: #dc2626;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #ef4444;
}
</style>