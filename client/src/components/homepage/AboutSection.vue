<template>
    <section class="relative py-20 lg:py-32 overflow-hidden" id="about">
        <div class="mx-auto px-4 sm:px-6 lg:px-6 max-w-7xl">
            <div class="flex flex-col lg:flex-row items-center gap-12">
                <div class="w-full lg:w-1/2 relative">
                    <div class="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-70"></div>
                    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80"
                        alt="Chef plating food"
                        class="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-full object-cover h-[500px]" />
                </div>

                <div class="w-full lg:w-1/2 lg:-ml-12 z-10">
                    <div class="bg-white p-8 lg:p-12 rounded-lg shadow-xl border-l-4 border-orange-500">
                        <h5 class="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Our Story</h5>
                        <h2 class="text-4xl lg:text-5xl font-bold text-stone-900 mb-6">Local Roots, <br>Global Flavors.
                        </h2>
                        <p class="text-stone-600 leading-relaxed mb-6">
                            Founded in 2018, The Rustic Spoon began with a simple philosophy: if it’s not fresh, it’s
                            not on the plate.
                            Chef Antonio believes in "Micro-Seasonality"—menus that change not just by the season, but
                            by the week.
                        </p>
                        <button
                            class="text-stone-900 font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-600 transition-colors">
                            Read the Full Philosophy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>