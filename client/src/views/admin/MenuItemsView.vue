<template>
   <div class="pt-6 pr-4 w-full space-y-6">
     <section class="flex items-center justify-between">
       <div>
         <h1 class="text-2xl font-bold text-foreground">Menu Items</h1>
         <p class="text-muted-foreground">Manage your restaurant&apos;s menu</p>
        </div>
        <AddMenuItemDialog/>
    </section>

    <section class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-4">
      <div  class="flex  items-center justify-between">
        <h2 class="font-semibold">All Items</h2>
      </div>

      <div v-if="isLoading" class="flex justify-center h-64 items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <div v-else-if="products.length < 0"  class="flex justify-center h-64 items-center">
        <p class="text-gray-500">No menu items found.</p>
      </div>

      <div v-else-if="products.length>0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Product card -->
      <div v-for="product in products" :key="product._id" class="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200">
        <div class="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
          <img :src="product.image" alt="" class="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105" loading="lazy">
        </div>

        <div class="flex flex-col p-3.5">

      <div class="mb-1 flex justify-between items-start gap-2">
        <h3
          class="text-base font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-red-600 transition-colors">
          {{ product.title }}
        </h3>

        <div v-if="(product.rating ?? 0) > 0"
          class="flex items-center gap-1 shrink-0 bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700">
          <span>{{ product.rating }}</span>
          <span class="text-yellow-500 text-xs">★</span>
        </div>
      </div>

      <p class="text-xs text-gray-500 line-clamp-1 mb-3">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mt-auto">

        <div class="flex flex-col">
          <span v-if="product
          .discountPrice" class="text-xs font-semibold line-through text-gray-500">{{ formatPrice(100) }}</span>
          <span v-else class="text-xs">&#8203;</span>
          <span class="text-lg font-extrabold" :class="product.discountPrice? 'text-indigo-600': 'text-gray-900'">{{ formatPrice(product.price) }}</span>

        </div>
      </div>

    </div>
      </div>
    </div>
    </section>
  </div>
</template>



<script setup lang="ts" >
import  AddMenuItemDialog from '@/components/admin/AddMenuItemDialog.vue';
import type { ProductProps } from '@/types';
import { onMounted, ref } from 'vue';
import { formatPrice } from '../../../utils';

// 1. Configuration
const baseURL = import.meta.env.VITE_API_BASE_URL;
const productsURL = `${baseURL}/menu/menu-fetch`;

// 2. Data State
const products = ref<ProductProps[]>([]); // Holds the API data
const isLoading = ref(true);
const error = ref<string | null>(null);


// 4. Fetch Function (Async)
const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(productsURL);

    if (!response.ok) {
      throw new Error(`Failed to load menu: ${response.statusText}`);
    }

    const result = await response.json();

    // Assign the data from the API response
    products.value = result.data;


  } catch (err: unknown) {
    console.error('Error fetching products:', err);
    // 2. Check if 'err' is actually an Error object before accessing .message
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      // Fallback for weird errors (like if a library throws a plain string)
      error.value = 'An unknown error occurred';
    }
  } finally {
    isLoading.value = false;
  }
};

// 5. Lifecycle Hook (Triggers fetch immediately on load)
onMounted(() => {
  fetchProducts();
});
</script>
