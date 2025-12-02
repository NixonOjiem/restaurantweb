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
    <footer class="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-10 px-4 font-sans relative">
        <div class="max-w-7xl mx-auto">

            <div
                class="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-10 mb-16 border border-gray-700 shadow-2xl overflow-hidden group">

                <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="text-center md:text-left max-w-lg">
                        <h3
                            class="text-2xl md:text-3xl font-serif font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Join the Inner Circle
                        </h3>
                        <p class="text-gray-400 text-sm md:text-base leading-relaxed">
                            Receive invitation-only event details, secret menu drops, and exclusive sommelier
                            selections.
                        </p>
                    </div>

                    <div class="w-full md:w-auto min-w-[320px] max-w-md">
                        <form class="relative flex items-center" @submit.prevent>
                            <input type="email" placeholder="Enter your email address"
                                class="w-full pl-6 pr-36 py-4 rounded-full bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-900/30 transition-all shadow-inner backdrop-blur-md">
                            <button
                                class="absolute right-2 top-2 bottom-2 bg-gradient-to-br from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-semibold px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-red-900/50 text-sm tracking-wide">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div
                    class="absolute top-0 right-0 w-64 h-64 bg-red-800/10 rounded-full blur-[80px] group-hover:bg-red-700/20 transition-all duration-1000">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pb-12 border-b border-gray-800">

                <div class="space-y-6">
                    <div class="flex items-center gap-5">
                        <div
                            class="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-red-500 to-red-900 p-[2px] flex items-center justify-center shadow-lg shadow-red-900/20">
                            <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-red-400" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                    <path d="M7 2v20" />
                                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                                </svg>
                            </div>
                        </div>

                        <div class="flex flex-col">
                            <h2 class="text-3xl font-serif font-bold text-white leading-none tracking-wider">
                                Cuisine
                            </h2>
                            <span class="text-lg text-red-500 font-sans font-medium tracking-[0.2em] uppercase mt-1">
                                Elegante
                            </span>
                        </div>
                    </div>

                    <p class="text-gray-400 leading-relaxed text-sm pt-2">
                        Experience the art of fine dining where culinary excellence meets sophisticated ambiance.
                    </p>

                    <div class="flex space-x-3">
                        <a v-for="item in ['IG', 'FB', 'TT']" :key="item" href="#"
                            class="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 hover:bg-red-900/20 hover:border-red-800 hover:text-red-400 transition-all duration-300">
                            <span class="font-bold text-xs">{{ item }}</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 class="text-white font-serif font-bold mb-6 tracking-wide">Quick Links</h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href"
                                class="text-gray-400 hover:text-red-400 text-sm transition-colors flex items-center gap-2 group">
                                <span
                                    class="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-white font-serif font-bold mb-6 tracking-wide">Contact Info</h3>

                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-3 shrink-0">📍</span>
                            <span class="text-gray-400 text-sm leading-relaxed">123 Gourmet Avenue, Culinary District,
                                CD 10101</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-3 shrink-0">📞</span>
                            <span class="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">+1
                                (555) 123-4567</span>
                        </li>
                    </ul>

                    <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 class="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Opening Hours</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between text-gray-400"><span>Mon - Thu</span> <span>5pm -
                                    10pm</span></div>
                            <div class="flex justify-between text-white font-medium"><span>Fri - Sat</span> <span
                                    class="text-red-400">5pm - 11pm</span></div>
                            <div class="flex justify-between text-gray-400"><span>Sunday</span> <span>4pm - 9pm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col h-full min-h-[250px]">
                    <h3 class="text-white font-serif font-bold mb-6 tracking-wide">Find Us</h3>
                    <div
                        class="flex-grow w-full bg-gray-800 rounded-xl overflow-hidden relative group border border-gray-700 hover:border-red-900/50 transition-colors shadow-lg">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                            class="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            alt="Map">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="absolute bottom-4 left-4 right-4">
                            <button
                                class="w-full text-sm font-bold text-white bg-red-800/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-1 transition-transform">
                                Get Directions <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <div class="mb-4 md:mb-0">&copy; {{ currentYear }} Cuisine Elegante. All rights reserved.</div>
                <div class="flex gap-8">
                    <a href="#" class="hover:text-gray-300 transition-colors">Privacy</a>
                    <a href="#" class="hover:text-gray-300 transition-colors">Terms</a>
                    <a href="#" class="hover:text-gray-300 transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
</template>