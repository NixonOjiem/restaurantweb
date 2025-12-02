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
    { name: 'About Us', href: '#' },
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
                        <p class="text-gray-400 text-sm md:text-base">
                            Receive invitation-only event details and exclusive sommelier selections.
                        </p>
                    </div>

                    <div class="w-full md:w-auto min-w-[320px]">
                        <form class="relative flex items-center" @submit.prevent>
                            <input type="email" placeholder="Enter your email address"
                                class="w-full pl-6 pr-32 py-4 rounded-full bg-gray-950 border border-gray-700 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner">
                            <button
                                class="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-medium px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-900/50">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div
                    class="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-1000">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800">

                <div class="space-y-6">
                    <div class="flex items-center">
                        <div
                            class="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-900 p-0.5 mr-3 flex items-center justify-center shadow-lg shadow-red-900/20">
                            <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                    <path d="M7 2v20" />
                                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                                </svg>
                            </div>
                        </div>
                        <h2 class="text-3xl font-serif font-bold tracking-wider">Cuisine <span
                                class="text-red-400">Elegante</span></h2>
                    </div>

                    <p class="text-gray-400 leading-relaxed max-w-md text-sm">
                        Experience the art of fine dining where culinary excellence meets sophisticated ambiance.
                    </p>

                    <div class="flex space-x-4">
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/50">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/50">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-serif font-semibold mb-6 relative inline-block">
                        Quick Links
                        <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-red-500"></span>
                    </h3>
                    <ul class="space-y-3">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href"
                                class="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center group">
                                <span
                                    class="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-xl font-serif font-semibold mb-6 relative inline-block">
                        Contact Info
                        <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-red-500"></span>
                    </h3>

                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-3 shrink-0">📍</span>
                            <span class="text-gray-400 text-sm">123 Gourmet Avenue, Culinary District, CD 10101</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-red-500 mt-0.5 mr-3 shrink-0">📞</span>
                            <span class="text-gray-400 text-sm">+1 (555) 123-4567</span>
                        </li>
                    </ul>

                    <div class="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                        <h4 class="text-sm font-bold text-white mb-3 uppercase tracking-wider">Opening Hours</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between text-gray-400"><span>Mon - Thu</span> <span>5:00 PM - 10:00
                                    PM</span></div>
                            <div class="flex justify-between text-white font-medium"><span>Fri - Sat</span> <span
                                    class="text-red-400">5:00 PM - 11:00 PM</span></div>
                            <div class="flex justify-between text-gray-400"><span>Sunday</span> <span>4:00 PM - 9:00
                                    PM</span></div>
                        </div>
                    </div>
                </div>

                <div class="h-full min-h-[240px] flex flex-col">
                    <h3 class="text-xl font-serif font-semibold mb-6 relative inline-block">
                        Find Us
                        <span class="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-red-500"></span>
                    </h3>
                    <div
                        class="flex-grow w-full bg-gray-800 rounded-xl overflow-hidden relative group border border-gray-700 hover:border-red-500/50 transition-colors">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                            class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                            alt="Map">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div class="absolute bottom-4 left-4">
                            <button
                                class="text-xs font-bold text-white bg-red-600 px-3 py-2 rounded-lg shadow-lg hover:bg-red-500 transition-colors flex items-center gap-2">
                                Get Directions <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                <div class="text-gray-500 mb-4 md:mb-0">&copy; {{ currentYear }} Cuisine Elegante. All rights reserved.
                </div>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">Sitemap</a>
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
    background: #1f2937;
}

::-webkit-scrollbar-thumb {
    background: #ef4444;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #dc2626;
}
</style>