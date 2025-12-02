<script setup lang="ts">
import { defineOptions } from 'vue';

defineOptions({
    name: 'RestaurantGallery'
});

const galleryItems = [
    {
        id: 1,
        title: 'The Grand Dining Room',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
        class: 'md:col-span-2 md:row-span-2 h-64 md:h-auto' // Large Main Image
    },
    {
        id: 2,
        title: 'Chef\'s Finishing Touch',
        category: 'Culinary Art',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80',
        class: 'md:col-span-1 md:row-span-2 h-64 md:h-auto' // Tall Vertical Image
    },
    {
        id: 3,
        title: 'Wagyu & Truffle',
        category: 'Signature Dish',
        image: 'https://images.unsplash.com/photo-1544025162-d76690b67f14?auto=format&fit=crop&q=80',
        class: 'md:col-span-1 md:row-span-1 h-64 md:h-80' // Small Square
    },
    {
        id: 4,
        title: 'Smoked Old Fashioned',
        category: 'Mixology',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
        class: 'md:col-span-1 md:row-span-1 h-64 md:h-80' // Small Square
    }
];
</script>

<template>
    <section class="py-24 bg-stone-950 text-white relative overflow-hidden" id="gallery">

        <div
            class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none">
        </div>

        <div class="mx-auto px-6 relative z-10">

            <div class="text-center mb-16 max-w-2xl mx-auto">
                <h5 class="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-3">Atmosphere</h5>
                <h2 class="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
                    A Visual <span class="text-stone-500 italic">Feast</span>
                </h2>
                <div class="h-1 w-20 bg-red-600 mx-auto rounded-full mb-6"></div>
                <p class="text-stone-400 font-light leading-relaxed">
                    From the warmth of our hearth to the precision of our plating, explore the details that define the
                    Cuisine Elegante experience.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">

                <div v-for="item in galleryItems" :key="item.id" :class="[
                    item.class,
                    'relative group rounded-xl overflow-hidden cursor-pointer shadow-lg border border-stone-800'
                ]">
                    <img :src="item.image" :alt="item.title"
                        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform" />

                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500">
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                        <span
                            class="text-red-400 text-xs font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {{ item.category }}
                        </span>

                        <div
                            class="flex items-end justify-between border-t border-white/20 pt-4 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 class="text-xl md:text-2xl font-serif font-bold text-white">
                                {{ item.title }}
                            </h3>

                            <div
                                class="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div
                        class="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 rounded-xl transition-colors duration-500 pointer-events-none">
                    </div>
                </div>

            </div>

            <div class="text-center mt-12">
                <button
                    class="group inline-flex items-center gap-3 text-white border border-stone-700 px-8 py-4 rounded-full hover:bg-white hover:text-stone-950 transition-all duration-300">
                    <span class="font-bold tracking-wide text-sm uppercase">View Full Gallery</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

        </div>
    </section>
</template>