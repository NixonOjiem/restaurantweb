<template>
    <section class="py-20 bg-stone-900 text-stone-100">
        <div class="container mx-auto px-6">
            <div class="flex justify-between items-end mb-12 border-b border-stone-700 pb-4">
                <h2 class="text-3xl md:text-4xl font-bold">Happenings</h2>
                <a href="#" class="text-orange-500 hover:text-orange-400">View Calendar &rarr;</a>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div
                    class="bg-stone-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6 border border-stone-700 hover:border-orange-500 transition-colors group">
                    <div
                        class="w-full sm:w-32 h-32 bg-stone-700 rounded-lg flex flex-col items-center justify-center shrink-0 border border-stone-600">
                        <span class="text-orange-500 font-bold text-sm uppercase">OCT</span>
                        <span class="text-4xl font-bold text-white">24</span>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2 group-hover:text-orange-400">Jazz & Wine Night</h3>
                        <p class="text-stone-400 text-sm mb-4">Live saxophone performance accompanied by a curated
                            selection of vintage wines.</p>
                        <span class="inline-block px-3 py-1 bg-stone-900 rounded text-xs text-stone-300">7:00 PM - 10:00
                            PM</span>
                    </div>
                </div>

                <div
                    class="bg-stone-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6 border border-stone-700 hover:border-orange-500 transition-colors group">
                    <div
                        class="w-full sm:w-32 h-32 bg-stone-700 rounded-lg flex flex-col items-center justify-center shrink-0 border border-stone-600">
                        <span class="text-orange-500 font-bold text-sm uppercase">NOV</span>
                        <span class="text-4xl font-bold text-white">05</span>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2 group-hover:text-orange-400">Chef's Table: Autumn</h3>
                        <p class="text-stone-400 text-sm mb-4">A 7-course tasting menu featuring the best of the autumn
                            harvest.</p>
                        <span class="inline-block px-3 py-1 bg-stone-900 rounded text-xs text-stone-300">Limited
                            Seats</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>