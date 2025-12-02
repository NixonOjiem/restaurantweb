<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
    name: 'RestaurantEvents'
});

const events = [
    {
        id: 1,
        month: 'OCT',
        day: '24',
        title: 'Jazz & Pinot Noir',
        description: 'A live saxophone performance accompanied by a curated selection of vintage wines from the Loire Valley.',
        time: '7:00 PM - 10:00 PM',
        type: 'Live Music'
    },
    {
        id: 2,
        month: 'NOV',
        day: '05',
        title: 'Chef\'s Table: Autumn',
        description: 'An intimate 7-course tasting menu featuring the finest harvest ingredients, hosted by Chef Antonio.',
        time: 'Limited Seats',
        type: 'Dining Experience'
    }
];
</script>

<template>
    <section class="py-24 bg-linear-to-b from-stone-900 to-stone-950 text-stone-100 relative overflow-hidden">

        <div
            class="absolute top-0 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none">
        </div>
        <div
            class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-stone-800/10 rounded-full blur-[100px] pointer-events-none">
        </div>

        <div class="mx-auto px-6 relative z-10">

            <div
                class="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-800/60 pb-6 gap-6">
                <div>
                    <h5 class="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-2">Calendar</h5>
                    <h2 class="text-4xl md:text-5xl font-serif font-bold text-white">Upcoming <span
                            class="text-stone-600 italic">Affairs</span></h2>
                </div>

                <a href="#"
                    class="group flex items-center gap-2 text-stone-400 hover:text-white transition-colors pb-1">
                    <span class="text-sm font-bold uppercase tracking-widest">View Full Calendar</span>
                    <span class="group-hover:translate-x-1 transition-transform text-red-500">→</span>
                </a>
            </div>

            <div class="grid md:grid-cols-2 gap-8">

                <div v-for="event in events" :key="event.id"
                    class="group relative bg-stone-900/40 border border-stone-800 hover:border-red-900/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1">
                    <div
                        class="absolute inset-0 bg-linear-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                    </div>

                    <div class="flex flex-col sm:flex-row h-full">

                        <div
                            class="w-full sm:w-32 bg-stone-950/80 border-b sm:border-b-0 sm:border-r border-stone-800 flex flex-row sm:flex-col items-center justify-between sm:justify-center p-6 sm:p-0 gap-1 shrink-0 group-hover:bg-red-950/20 transition-colors duration-500">
                            <span class="text-red-500 font-bold text-sm tracking-[0.2em] uppercase">{{ event.month
                                }}</span>
                            <span class="text-4xl md:text-5xl font-serif font-bold text-white">{{ event.day }}</span>
                            <span
                                class="sm:hidden text-xs text-stone-500 font-mono border border-stone-800 px-2 py-1 rounded">{{
                                    event.time }}</span>
                        </div>

                        <div class="p-8 flex flex-col justify-between w-full">
                            <div>
                                <div class="flex justify-between items-start mb-3">
                                    <span
                                        class="text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-800 px-2 py-1 rounded-md">{{
                                            event.type }}</span>
                                </div>

                                <h3
                                    class="text-2xl font-serif font-bold mb-3 text-stone-100 group-hover:text-red-400 transition-colors">
                                    {{ event.title }}
                                </h3>

                                <p class="text-stone-400 text-sm leading-relaxed mb-6 font-light">
                                    {{ event.description }}
                                </p>
                            </div>

                            <div class="flex items-center justify-between border-t border-stone-800 pt-4 mt-auto">
                                <div
                                    class="hidden sm:flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wide">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {{ event.time }}
                                </div>

                                <button
                                    class="text-sm font-bold text-white group-hover:text-red-500 transition-colors flex items-center gap-2 ml-auto">
                                    Reserve Seat
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>