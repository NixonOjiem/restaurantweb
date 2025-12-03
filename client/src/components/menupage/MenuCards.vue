<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ProductProps } from '@/types';
import ProductCard from './ProductCard.vue';
import ProductQuickView from './ProductView.vue';

// 1. Configuration
const baseURL = import.meta.env.VITE_API_BASE_URL;
const productsURL = `${baseURL}/menu/menu-fetch`;

// 2. Data State
const products = ref<ProductProps[]>([]); // Holds the API data
const isLoading = ref(true);
const error = ref<string | null>(null);

// 3. Modal State
const isModalOpen = ref(false);
const selectedProduct = ref<any>(null);

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

  } catch (err: any) {
    console.error('Error fetching products:', err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// 5. Lifecycle Hook (Triggers fetch immediately on load)
onMounted(() => {
  fetchProducts();
});

// 6. Handlers
const handleAddToCart = (payload: any) => {
  // Logic handles both Card click (id only) and Modal click (full object)
  console.log('Added to cart:', payload);
};

const handleToggleWishlist = (id: number | string) => {
  // Note: Your Mongo items use '_id'. Ensure your template or type passes the correct ID.
  const product = products.value.find(p => (p.id === id || p._id === id));
  if (product) {
    product.isWishlisted = !product.isWishlisted;
  }
};

// 7. Open Modal Logic
const openProductModal = (product: any) => {
  // We need to format the data because the Modal expects an 'images' array
  // but your card data only has a single 'image' string.
  selectedProduct.value = {
    ...product,
    // If your Mongo ID is '_id', mapped it to 'id' here for the frontend if needed
    id: product._id || product.id,
    sku: 'CE-' + (product._id || product.id).toString().slice(-6), // Generate dummy SKU
    category: product.category || 'Main Course',
    images: product.image ? [product.image, product.image] : [] // Duplicate image to simulate gallery
  };
  isModalOpen.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-[#FFFDF5] to-[#FFFAEB] px-4 py-12 md:px-8 font-sans">
    <div class="max-w-7xl mx-auto mb-12 text-center">
      <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Menu</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Experience a symphony of flavors with our carefully curated selection of dishes.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">

      <div v-for="product in products" :key="product.id" @click="openProductModal(product)" class="cursor-pointer">
        <ProductCard :id="product.id" :title="product.title" :description="product.description" :price="product.price"
          :image="product.image" :rating="product.rating" :review-count="product.reviewCount"
          :is-wishlisted="product.isWishlisted" @add-to-cart="handleAddToCart" @toggle-wishlist="handleToggleWishlist">
          <template #badge v-if="product.badge">
            <div
              class="absolute top-2 left-2 bg-stone-900/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-lg z-10 tracking-widest">
              {{ product.badge }}
            </div>
          </template>
        </ProductCard>
      </div>

    </div>

    <ProductQuickView :isOpen="isModalOpen" :product="selectedProduct" @close="isModalOpen = false"
      @addToCart="handleAddToCart" />
  </div>
</template>
