<template>
    <div>
        <button 
              class="absolute top-3 right-3 z-50 p-2 bg-white/90 backdrop-blur-md rounded-full text-stone-600 hover:bg-stone-900 hover:text-white transition-all shadow-md border border-stone-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {{ product.title }}

            <!-- <img :src="product?.images[0]" alt=""></img> -->
            
    </div>
</template>

<script setup lang="ts">
import type { ProductProps } from '@/types';

const props = defineProps<{product: ProductProps}>();
</script>