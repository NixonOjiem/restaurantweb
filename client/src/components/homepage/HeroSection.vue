<template>
    <div class="min-h-screen bg-[#0f172a] overflow-hidden font-sans selection:bg-orange-500 selection:text-white">

        <section class="relative w-full h-screen flex items-center justify-center">

            <div class="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black">
                <div class="relative w-full h-full animate-subtle-zoom">
                    <img :src="heroImage" alt="Culinary Masterpiece" class="w-full h-full object-cover opacity-90" />
                </div>

                <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80"></div>

                <div
                    class="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                </div>
            </div>

            <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow">
                </div>
            </div>

            <div class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">

                <div class="group relative overflow-hidden rounded-[2.5rem] p-px">
                    <div
                        class="absolute inset-0 bg-linear-to-b from-white/20 via-white/5 to-transparent rounded-[2.5rem]">
                    </div>

                    <div
                        class="relative bg-black/40 backdrop-blur-2xl rounded-[2.4rem] p-8 md:p-16 text-center border border-white/5 shadow-2xl shadow-black/50">

                        <div class="flex justify-center mb-8 opacity-0 animate-fade-in-up"
                            style="animation-delay: 0.1s;">
                            <div
                                class="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default">
                                <span class="flex h-2 w-2 relative">
                                    <span
                                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                <span class="text-orange-200/90 text-xs font-bold uppercase tracking-[0.2em]">Michelin
                                    Star Experience</span>
                            </div>
                        </div>

                        <div class="space-y-6 mb-8 opacity-0 animate-fade-in-up" style="animation-delay: 0.3s;">
                            <h1
                                class="text-5xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white drop-shadow-lg">
                                Savor
                                <span
                                    class="text-transparent bg-clip-text bg-linear-to-r from-orange-200 via-amber-200 to-orange-400 italic pr-2">
                                    Excellence
                                </span>
                            </h1>
                            <p class="text-lg sm:text-xl text-gray-200/80 font-light max-w-2xl mx-auto leading-relaxed">
                                A symphony of flavors crafted by master chefs. <br class="hidden sm:block" />
                                Experience the perfect harmony of aroma and ambiance.
                            </p>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up"
                            style="animation-delay: 0.5s;">
                            <button
                                class="group relative w-full sm:w-auto overflow-hidden bg-white text-black font-bold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                                <span class="relative z-10 flex items-center justify-center gap-2">
                                    Discover Menu
                                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </button>

                            <button
                                class="group relative w-full sm:w-auto overflow-hidden text-white font-medium py-4 px-10 rounded-full transition-all duration-300 hover:bg-white/10">
                                <span
                                    class="absolute inset-0 border border-white/30 rounded-full group-hover:border-white/60 transition-colors"></span>
                                <span class="relative z-10 flex items-center justify-center gap-2">
                                    Watch Video
                                    <div
                                        class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                        <svg class="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-12 flex flex-wrap justify-center gap-12 sm:gap-24 opacity-0 animate-fade-in-up"
                    style="animation-delay: 0.7s;">
                    <div v-for="stat in stats" :key="stat.label" class="text-center group cursor-default">
                        <div
                            class="text-3xl sm:text-4xl font-serif text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">
                            {{ stat.value }}</div>
                        <div class="text-xs text-white/40 uppercase tracking-widest font-semibold">{{ stat.label }}
                        </div>
                    </div>
                </div>

            </div>

            <div
                class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 opacity-0 animate-fade-in delay-1000">
                <span class="text-[10px] text-white/40 uppercase tracking-[0.3em]">Scroll</span>
                <div class="w-px h-12 bg-linear-to-b from-white/0 via-white/40 to-white/0">
                    <div class="w-full h-1/2 bg-white/80 animate-scroll-line"></div>
                </div>
            </div>

        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const stats = [
    { value: '3', label: 'Michelin Stars' },
    { value: '25+', label: 'Years Legacy' },
    { value: '180', label: 'Wines' }
];

defineProps({
    heroImage: {
        type: String,
        default: '/roasted-chicken.png'
    }
});
</script>

<style scoped>
/* Keyframe Animations */
@keyframes subtle-zoom {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.1);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scroll-line {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(200%);
    }
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

/* Animation Classes */
.animate-subtle-zoom {
    animation: subtle-zoom 20s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
}

.animate-fade-in-up {
    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scroll-line {
    animation: scroll-line 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
}

.bg-radial-gradient {
    background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 40%, var(--tw-gradient-to) 100%);
}
</style>