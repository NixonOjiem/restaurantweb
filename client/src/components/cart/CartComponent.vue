<template>
  <div class="max-w-7xl mx-auto p-8 font-sans text-gray-800 bg-[#FFFDF4]">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 mt-9">Your Cart</h1>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center p-16 bg-gray-50 rounded-xl">
      <div class="w-10 h-10 border-4 border-gray-100 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-600">Loading delicious items...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center p-16 bg-gray-50 rounded-xl">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button @click="fetchCart" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Try Again
      </button>
    </div>

    <!-- When cart is empty -->
    <div v-else-if="!cart || cart.items.length === 0" class="text-center p-16 bg-gray-50 rounded-xl">
      <p class="text-gray-600 mb-4">Your cart is empty.</p>
      <router-link to="/menu"
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Browse Our Menu
      </router-link>
    </div>

    <!-- when cart has items -->
    <div v-else class="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8">
      <div class="flex flex-col gap-6">
        <div v-for="item in cart.items" :key="item._id"
          class="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

          <div class="w-full h-[200px] md:w-[150px] md:h-[150px] shrink-0">
            <img :src="getImageUrl(item.menuItem.image)" :alt="item.menuItem.title" @error="handleImageError"
              class="w-full h-full object-cover" />
          </div>

          <div class="flex-1 p-5 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-gray-900 m-0">{{ item.menuItem.title }}</h3>
              <span class="font-bold text-lg text-slate-700">{{ formatCurrency(item.total) }}</span>
            </div>

            <p class="text-sm text-gray-500 uppercase tracking-wide mb-2">{{ item.menuItem.category }}</p>

            <div v-if="item.instructions" class="bg-gray-50 p-2 rounded-md text-sm text-gray-600 mb-4">
              <span class="font-semibold text-amber-600">Note:</span> {{ item.instructions }}
            </div>

            <div class="flex justify-between items-center mt-auto">
              <span class="text-sm text-gray-500">{{ formatCurrency(item.price) }} each</span>

              <div class="flex items-center gap-3">

                <div class="flex items-center bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-semibold text-sm">
                  <button
                    class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors cursor-pointer pb-0.5"
                    @click="item.quantity > 1 ? item.quantity-- : null">
                    -
                  </button>

                  <span class="mx-2 w-4 text-center">{{ item.quantity }}</span>

                  <button
                    class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors cursor-pointer pb-0.5"
                    @click="item.quantity++">
                    +
                  </button>
                </div>

                <font-awesome-icon :icon="faTrashCan"
                  class="text-red-500 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-125 hover:text-red-700 cursor-pointer" />

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order summary floating on the right -->
      <div class="bg-white p-6 rounded-xl border border-gray-100 h-fit sticky top-5">
        <h2 class="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

        <div class="flex justify-between mb-4 text-gray-600">
          <span>Total Items</span>
          <span>{{ cart.totalQuantity }}</span>
        </div>

        <div class="h-px bg-gray-200 my-4"></div>

        <div class="flex justify-between text-xl font-bold text-gray-900 mt-4 mb-6">
          <span>Total</span>
          <span>{{ formatCurrency(cart.totalPrice) }}</span>
        </div>

        <button
          class="w-full bg-emerald-500 text-white p-4 rounded-lg text-base font-semibold hover:bg-emerald-600 transition-colors">
          Proceed to Checkout
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { CartData } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';

const useAuth = useAuthStore();
const token = useAuth.token;

// State
// NOTE: We initialize as null because we are fetching an Object, not an Array
const cart = ref<CartData | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const baseUrl = import.meta.env.VITE_API_BASE_URL; //
const cartUrl = `${baseUrl}/cart`;

// Helper: Format Numbers to Currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value);
};

// Helper: Handle Image URLs
const getImageUrl = (path: string) => {
  if (!path) return '/foodplacehoder.jpg';
  if (path.startsWith('http')) return path;
  return `${path}`;
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/foodplacehoder.jpg';
};

// Fetch Logic
const fetchCart = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch(cartUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch cart');

    const apiData = await response.json();

    // console.log("🔥 API RESPONSE:", apiData);

    if (apiData.success && apiData.data) {

      cart.value = apiData.data;
    } else {
      throw new Error('Invalid data format received');
    }

  } catch (err: unknown) {
    console.error(err);
    // error.value = err.message || 'Could not load cart';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
/* No styles needed - Tailwind handles everything */
</style>
