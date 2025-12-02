<template>
    <div class="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1a2633] to-[#2d3748]">
        <!-- Hero Section -->
        <section class="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-6">
            <!-- Animated Background -->
            <div class="absolute inset-0 overflow-hidden">
                <div
                    class="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-orange-500 to-amber-500 rounded-full opacity-20 blur-3xl animate-float-slow">
                </div>
                <div
                    class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-amber-400 to-yellow-400 rounded-full opacity-15 blur-3xl animate-float-medium">
                </div>
                <div class="absolute inset-0 opacity-[0.02] bg-size-[80px_80px] bg-grid-white"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 w-full max-w-7xl mx-auto px-6">
                <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    <!-- Text Content -->
                    <div class="w-full lg:w-1/2 flex flex-col justify-center space-y-8 text-center lg:text-left">
                        <!-- Animated Badge -->
                        <div
                            class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 animate-fade-in">
                            <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                            <p class="text-orange-300 font-semibold tracking-wider text-sm uppercase">
                                Premium Culinary Experience
                            </p>
                        </div>

                        <!-- Main Heading -->
                        <div class="space-y-6">
                            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                                <span class="text-white">Savor</span>
                                <span
                                    class="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-400 to-yellow-400 italic mt-4">
                                    Excellence
                                </span>
                            </h1>
                            <div class="flex items-center gap-4 justify-center lg:justify-start">
                                <div class="w-12 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full"></div>
                                <p class="text-xl text-gray-300 font-light">Every Bite Tells a Story</p>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                            Where master chefs transform the finest ingredients into unforgettable moments.
                            Experience the perfect harmony of flavor, aroma, and ambiance in every dish.
                        </p>

                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-6 pt-8 justify-center lg:justify-start">
                            <button
                                class="group relative overflow-hidden bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                                <span class="relative z-10 flex items-center gap-3">
                                    Discover Menu
                                    <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>

                            <button
                                class="group relative overflow-hidden border-2 border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 hover:border-orange-400 hover:scale-105 backdrop-blur-sm">
                                <span class="relative z-10 flex items-center gap-3">
                                    Book Table
                                    <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <!-- Stats -->
                        <div class="flex flex-wrap gap-8 pt-12 justify-center lg:justify-start">
                            <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
                                <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
                                <div class="text-gray-400 text-sm">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Image Content -->
                    <div class="w-full lg:w-1/2 relative flex items-center justify-center">
                        <div class="relative w-full max-w-lg">
                            <!-- Background Effect -->
                            <div
                                class="absolute -inset-8 bg-linear-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl">
                            </div>

                            <!-- Main Image -->
                            <div class="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <div class="h-120 relative">
                                    <img :src="heroImage" alt="Culinary Masterpiece"
                                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                                    <!-- Overlay Gradient -->
                                    <div
                                        class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div class="text-white/60 text-sm uppercase tracking-widest animate-pulse">Scroll to Explore</div>
                <div class="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                    <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Navigation data
const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Reservations', href: '#' },
    { name: 'Contact', href: '#' }
];

const stats = [
    { value: '50+', label: 'Signature Dishes' },
    { value: '15+', label: 'Master Chefs' },
    { value: '25+', label: 'Years Experience' }
];

// Reactive state
const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Scroll handler - fixed to properly detect scroll
const handleScroll = () => {
    // Check if user has scrolled more than 10px
    isScrolled.value = window.scrollY > 10;
};

// Menu toggle
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize scroll state
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Props
defineProps({
    heroImage: {
        type: String,
        default: '/roasted-chicken.png'
    },
    logoSvg: {
        type: String,
        default: '@/assets/Cuisine-Elegante.svg'
    }
});
</script>

<style scoped>
/* Custom animations */
@keyframes float-slow {

    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

@keyframes float-medium {

    0%,
    100% {
        transform: translateX(0px) translateY(0px);
    }

    33% {
        transform: translateX(10px) translateY(-15px);
    }

    66% {
        transform: translateX(-5px) translateY(10px);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
}

.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}

/* Grid background pattern */
.bg-grid-white {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 80px 80px;
}

/* Ensure smooth transitions */
header {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

nav {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>