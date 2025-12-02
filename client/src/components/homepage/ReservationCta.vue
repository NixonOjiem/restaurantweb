<template>
    <section class="relative py-32 bg-fixed bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80');">
        <div class="absolute inset-0 bg-black/60"></div>

        <div class="relative z-10  mx-auto px-6 text-center text-white">
            <h2 class="text-5xl lg:text-6xl font-bold mb-6">Taste the Experience</h2>
            <p class="text-xl text-stone-200 mb-10 max-w-2xl mx-auto">Whether you're looking for a romantic evening out
                or a cozy night in.</p>

            <div class="flex flex-col sm:flex-row justify-center gap-6">
                <button
                    class="px-8 py-4 bg-orange-600 rounded-lg font-bold text-lg hover:bg-orange-700 hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(234,88,12,0.5)]">
                    Book a Table
                </button>
                <button
                    class="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-bold text-lg hover:bg-white hover:text-stone-900 transition-all">
                    Order Online
                </button>
            </div>
        </div>
    </section>
</template>