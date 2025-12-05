<script setup lang="ts">
const dishes = [
    {
        id: 1,
        name: "Wagyu A5 Tartare",
        price: "$45",
        desc: "Hand-cut beef, smoked egg yolk, capers, truffle pearls, served with bone marrow toast.",
        img: "https://images.unsplash.com/photo-1544025162-d76690b67f14?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        name: "Seared Scallops",
        price: "$38",
        desc: "Hokkaido scallops, cauliflower silk, crispy pancetta, lemon butter foam, micro herbs.",
        img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        name: "Truffle Risotto",
        price: "$32",
        desc: "Acquerello rice, wild forest mushrooms, 24-month aged parmesan, shaved black truffle.",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80"
    }
];
</script>

<template>
    <section class="py-24 bg-stone-950 text-white relative overflow-hidden" id="menu">

        <div
            class="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        </div>
        <div
            class="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none">
        </div>

        <div class="mx-auto px-6 relative z-10">

            <div class="text-center mb-16 max-w-3xl mx-auto">
                <h5 class="text-red-500 font-bold tracking-[0.25em] uppercase text-xs mb-3">Culinary Art</h5>
                <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    Chef's <span class="text-stone-600 italic">Selection</span>
                </h2>
                <div class="h-1 w-16 bg-linear-to-r from-red-600 to-red-800 mx-auto rounded-full mb-6"></div>
                <p class="text-stone-400 font-light leading-relaxed">
                    A curation of dishes that define our identity. Sourced from local artisans, elevated by technique,
                    and plated with passion.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div v-for="dish in dishes" :key="dish.id"
                    class="group relative bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden hover:border-red-900/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/10">

                    <div class="h-72 overflow-hidden relative">
                        <img :src="dish.img" :alt="dish.name"
                            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        <div
                            class="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/20 to-transparent opacity-80">
                        </div>

                        <div
                            class="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md border border-stone-800 px-4 py-2 rounded-full shadow-lg">
                            <span class="text-amber-400 font-serif font-bold text-lg italic">{{ dish.price }}</span>
                        </div>
                    </div>

                    <div class="p-8 relative">
                        <div
                            class="absolute -top-6 right-8 w-12 h-12 bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>

                        <h3
                            class="text-2xl font-serif font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                            {{ dish.name }}
                        </h3>
                        <p class="text-stone-400 text-sm leading-relaxed mb-6 font-light">
                            {{ dish.desc }}
                        </p>

                        <button
                            class="text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors flex items-center gap-2">
                            Add to Order
                            <span class="w-8 h-px bg-stone-700 group-hover:bg-red-500 transition-colors"></span>
                        </button>
                    </div>

                </div>

            </div>

            <div class="text-center mt-16">
                <button
                    class="group relative px-10 py-4 bg-transparent border border-stone-700 text-stone-300 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:text-white hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <span class="relative z-10 flex items-center gap-3">
                        View Full Menu
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <div
                        class="absolute inset-0 bg-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out">
                    </div>
                </button>
            </div>

        </div>
    </section>
</template>