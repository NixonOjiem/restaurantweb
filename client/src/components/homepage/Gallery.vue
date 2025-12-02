<template>
    <section class="py-20" id="gallery">
        <div class=" mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">Visual Feast</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[500px]">
                <div class="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Interior">
                    <div
                        class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xl">
                        Interior</div>
                </div>
                <div class="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Detail">
                </div>
                <div class="col-span-1 row-span-2 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Plating">
                </div>
                <div class="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
                    <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Drinks">
                </div>
            </div>
        </div>
    </section>
</template>