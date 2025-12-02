<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
    name: 'AboutSection'
});
</script>

<template>
    <section class="relative py-24 lg:py-32 overflow-hidden bg-stone-950" id="about">

        <div class="absolute inset-0 opacity-[0.03]"
            style="background-image: url('https://www.transparenttextures.com/patterns/stardust.png');"></div>
        <div
            class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none">
        </div>

        <div class="mx-auto px-6 relative z-10">
            <div class="flex flex-col lg:flex-row items-center">

                <div class="w-full lg:w-1/2 relative group">
                    <div
                        class="absolute -inset-4 border border-stone-800 rounded-2xl z-0 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700">
                    </div>

                    <div class="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80"
                            alt="Chef plating food"
                            class="w-full h-[500px] lg:h-[600px] object-cover transform transition-transform duration-1000 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent">
                        </div>

                        <div
                            class="absolute bottom-6 left-6 bg-stone-900/90 backdrop-blur-md border border-stone-700 px-6 py-4 rounded-lg shadow-xl">
                            <p class="text-xs text-stone-500 uppercase tracking-widest mb-1">Established</p>
                            <p class="text-2xl font-serif font-bold text-white">2018</p>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 lg:-ml-20 relative z-20 mt-12 lg:mt-0">
                    <div
                        class="bg-stone-900/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-stone-800/50 relative overflow-hidden">

                        <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-700 to-red-900"></div>

                        <div class="mb-8">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="w-12 h-px bg-red-600"></span>
                                <h5 class="text-red-500 font-bold tracking-[0.25em] uppercase text-xs">Our Philosophy
                                </h5>
                            </div>
                            <h2 class="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                                Local Roots, <br>
                                <span class="text-stone-600 italic">Global Flavors.</span>
                            </h2>
                        </div>

                        <div class="space-y-6 text-stone-400 font-light leading-relaxed">
                            <p>
                                Founded in 2018, <strong class="text-white font-serif">Cuisine Elegante</strong> began
                                with a non-negotiable principle: if it’s not fresh, it doesn't leave the kitchen.
                            </p>
                            <p>
                                Chef Antonio champions the concept of <span
                                    class="text-red-400 font-medium">"Micro-Seasonality"</span>. Our menus are fluid,
                                evolving not just by the season, but by the week.
                            </p>
                        </div>

                        <div
                            class="mt-10 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">

                            <div class="text-left">
                                <p class="text-xs text-stone-500 uppercase tracking-widest mb-1">Executive Chef</p>
                                <p class="font-serif italic text-2xl text-white">Antonio Rossi</p>
                            </div>

                            <button
                                class="group flex items-center gap-3 text-white text-sm font-bold uppercase tracking-wider hover:text-red-500 transition-colors duration-300">
                                Read Full Story

                                <span
                                    class="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/10 transition-all duration-300">

                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300 stroke-current"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>

                                </span>
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>