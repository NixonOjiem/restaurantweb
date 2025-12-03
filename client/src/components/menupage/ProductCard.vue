<script setup lang="ts">
import { computed } from 'vue';
import type { ProductProps } from '@/types'

// 2. Set Default Values
const props = withDefaults(defineProps<ProductProps>(), {
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
        class="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">

        <div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <img :src="image" :alt="title"
                class="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                loading="lazy" />

            <slot name="badge"></slot>

            <button @click.stop="$emit('toggle-wishlist', id)"
                class="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform active:scale-90 hover:bg-white"
                :class="isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
                aria-label="Add to wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :fill="isWishlisted ? 'currentColor' : 'none'"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>

        <div class="flex flex-col p-3.5">

            <div class="mb-1 flex justify-between items-start gap-2">
                <h3
                    class="text-base font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-red-600 transition-colors">
                    {{ title }}
                </h3>

                <div v-if="rating > 0"
                    class="flex items-center gap-1 shrink-0 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700">
                    <span>{{ rating }}</span>
                    <span class="text-yellow-500 text-xs">★</span>
                </div>
            </div>

            <p class="text-xs text-gray-500 line-clamp-1 mb-3">
                {{ description }}
            </p>

            <div class="flex items-center justify-between mt-auto">

                <span class="text-lg font-extrabold text-gray-900">{{ formattedPrice }}</span>

                <button @click="$emit('add-to-cart', id)"
                    class="flex items-center justify-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-600 active:scale-95 shadow-md shadow-stone-900/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>

            </div>

        </div>
    </div>
</template>