<script setup lang="ts">
import { computed } from 'vue';

// 1. Define Props
interface Props {
    id: number | string;
    title: string;
    description: string;
    price: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    isWishlisted?: boolean;
}

// 2. Set Default Values
const props = withDefaults(defineProps<Props>(), {
    rating: 5,
    reviewCount: 0,
    isWishlisted: false,
});

// 3. Define Events
const emit = defineEmits<{
    (e: 'add-to-cart', id: number | string): void;
    (e: 'toggle-wishlist', id: number | string): void;
}>();

// 4. Price Formatter
const formattedPrice = computed(() => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(props.price);
});
</script>

<template>
    <div
        class="group relative flex w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">

        <div class="relative aspect-square w-full overflow-hidden bg-gray-100">
            <img :src="image" :alt="title"
                class="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                loading="lazy" />

            <slot name="badge"></slot>
        </div>

        <div class="flex flex-1 flex-col p-5 sm:p-6">

            <div class="mb-3 flex items-start justify-between gap-3">
                <h3
                    class="text-lg font-bold text-gray-900 leading-tight transition-colors group-hover:text-orange-600 line-clamp-2">
                    {{ title }}
                </h3>

                <button @click="$emit('toggle-wishlist', id)"
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-red-50 focus:outline-none"
                    :class="isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-500'"
                    aria-label="Add to wishlist">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform active:scale-75"
                        :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"
                        stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            <div class="mb-3 flex items-center space-x-1">
                <div class="flex text-yellow-400 text-sm">
                    <span v-for="i in 5" :key="i">
                        {{ i <= rating ? '★' : '☆' }} </span>
                </div>
                <span class="text-xs text-gray-400 font-medium" v-if="reviewCount > 0">
                    ({{ reviewCount }} reviews)
                </span>
            </div>

            <p class="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-500">
                {{ description }}
            </p>

            <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">

                <div class="flex flex-col">
                    <span class="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Price</span>
                    <span class="text-xl font-extrabold text-gray-900">{{ formattedPrice }}</span>
                </div>

                <button @click="$emit('add-to-cart', id)"
                    class="flex items-center gap-2 rounded-full border border-gray-900 bg-white px-5 py-2 text-sm font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Add</span>
                </button>

            </div>

        </div>
    </div>
</template>