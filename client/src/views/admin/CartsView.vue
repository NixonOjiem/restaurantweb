<template>
  <div class="space-y-6 pt-6 pr-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Shopping Carts</h1>
        <p class="text-slate-500">Manage all user shopping carts</p>
      </div>
      <button 
        @click="fetchAllCarts" 
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        <RefreshCw class="h-4 w-4" />
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center p-16 bg-white rounded-xl border border-slate-300">
      <div class="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-slate-600">Loading carts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center p-16 bg-white rounded-xl border border-slate-300">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button @click="fetchAllCarts" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!carts || carts.length === 0" class="text-center p-16 bg-white rounded-xl border border-slate-300">
      <ShoppingCart class="h-16 w-16 text-slate-300 mx-auto mb-4" />
      <p class="text-slate-600 text-lg font-medium mb-2">No active carts</p>
      <p class="text-slate-500 text-sm">There are currently no shopping carts in the system.</p>
    </div>

    <!-- Carts Grid -->
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="cart in carts" 
        :key="cart._id"
        class="border border-slate-300 bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Cart Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 text-white">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <User class="h-5 w-5" />
              <span class="font-medium">User ID: {{ cart.user }}</span>
            </div>
            <span 
              :class="{
                'bg-green-500': cart.status === 'active',
                'bg-yellow-500': cart.status === 'pending',
                'bg-gray-500': cart.status === 'abandoned'
              }"
              class="px-2 py-1 rounded text-xs font-semibold uppercase"
            >
              {{ cart.status }}
            </span>
          </div>
          <p class="text-indigo-100 text-xs">
            Created: {{ formatDate(cart.createdAt) }}
          </p>
        </div>

        <!-- Cart Stats -->
        <div class="p-4 bg-slate-50 border-b border-slate-200">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-slate-500 font-medium">Total Items</p>
              <p class="text-2xl font-bold text-slate-800">{{ cart.totalQuantity }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 font-medium">Total Value</p>
              <p class="text-2xl font-bold text-indigo-600">{{ formatCurrency(cart.totalPrice) }}</p>
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div class="p-4 space-y-3 max-h-64 overflow-y-auto">
          <div 
            v-for="item in cart.items" 
            :key="item._id"
            class="flex gap-3 bg-white p-3 rounded-lg border border-slate-200"
          >
            <div class="w-16 h-16 shrink-0 rounded-lg overflow-hidden">
              <img 
                :src="getImageUrl(item.menuItem.image)" 
                :alt="item.menuItem.title"
                @error="handleImageError"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-slate-900 text-sm truncate">{{ item.menuItem.title }}</h4>
              <p class="text-xs text-slate-500 uppercase">{{ item.menuItem.category }}</p>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-slate-600">Qty: {{ item.quantity }}</span>
                <span class="text-sm font-bold text-slate-700">{{ formatCurrency(item.total) }}</span>
              </div>
              <p v-if="item.instructions" class="text-xs text-slate-500 italic mt-1 truncate">
                Note: {{ item.instructions }}
              </p>
            </div>
          </div>
        </div>

        <!-- Cart Actions -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button 
            @click="viewCartDetails(cart)"
            class="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <Eye class="h-4 w-4" />
            View Details
          </button>
          <button 
            @click="deleteCart(cart._id)"
            class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Details Modal -->
    <div 
      v-if="selectedCart" 
      @click="selectedCart = null"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        @click.stop
        class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold">Cart Details</h2>
              <p class="text-indigo-100 text-sm mt-1">User ID: {{ selectedCart.user }}</p>
            </div>
            <button 
              @click="selectedCart = null"
              class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X class="h-6 w-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <!-- Cart Info -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-xs text-slate-500 font-medium mb-1">Status</p>
              <p class="font-semibold text-slate-800 capitalize">{{ selectedCart.status }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-xs text-slate-500 font-medium mb-1">Total Items</p>
              <p class="font-semibold text-slate-800">{{ selectedCart.totalQuantity }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-xs text-slate-500 font-medium mb-1">Total Price</p>
              <p class="font-semibold text-indigo-600">{{ formatCurrency(selectedCart.totalPrice) }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-xs text-slate-500 font-medium mb-1">Created</p>
              <p class="font-semibold text-slate-800 text-sm">{{ formatDate(selectedCart.createdAt) }}</p>
            </div>
          </div>

          <!-- Items List -->
          <h3 class="text-lg font-bold text-slate-900 mb-4">Cart Items</h3>
          <div class="space-y-4">
            <div 
              v-for="item in selectedCart.items" 
              :key="item._id"
              class="flex gap-4 bg-white p-4 rounded-lg border border-slate-200"
            >
              <div class="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                <img 
                  :src="getImageUrl(item.menuItem.image)" 
                  :alt="item.menuItem.title"
                  @error="handleImageError"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-slate-900 text-lg">{{ item.menuItem.title }}</h4>
                <p class="text-sm text-slate-500 uppercase mb-2">{{ item.menuItem.category }}</p>
                <div class="flex items-center gap-4 text-sm">
                  <span class="text-slate-600">Price: {{ formatCurrency(item.price) }}</span>
                  <span class="text-slate-600">Quantity: {{ item.quantity }}</span>
                  <span class="font-bold text-slate-900">Total: {{ formatCurrency(item.total) }}</span>
                </div>
                <div v-if="item.instructions" class="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
                  <p class="text-xs text-amber-800 font-medium mb-1">Special Instructions:</p>
                  <p class="text-sm text-amber-900">{{ item.instructions }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <div class="text-slate-600 text-sm">
            Last updated: {{ formatDate(selectedCart.updatedAt) }}
          </div>
          <button 
            @click="selectedCart = null"
            class="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CartData } from '@/types';
import { ShoppingCart, User, Eye, Trash2, RefreshCw, X } from 'lucide-vue-next';

// State
const carts = ref<CartData[]>([]);
const selectedCart = ref<CartData | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// API Configuration
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const cartsUrl = `${baseUrl}/restaurant/v1/cart`; // Admin endpoint to get all carts

// --- Helpers ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value);
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getImageUrl = (path: string) => {
  if (!path) return '/foodplacehoder.jpg';
  if (path.startsWith('http')) return path;
  return `${path}`;
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/foodplacehoder.jpg';
};

// --- Actions ---

// Fetch all carts (admin)
const fetchAllCarts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch(cartsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch carts');

    const apiData = await response.json();

    if (apiData.success && apiData.data) {
      carts.value = apiData.data;
    } else {
      throw new Error('Invalid data format received');
    }

  } catch (err: unknown) {
    console.error(err);
    error.value = err instanceof Error ? err.message : 'Could not load carts';
  } finally {
    isLoading.value = false;
  }
};

// View cart details
const viewCartDetails = (cart: CartData) => {
  selectedCart.value = cart;
};

// Delete cart
const deleteCart = async (cartId: string) => {
  if (!confirm('Are you sure you want to delete this cart?')) return;

  try {
    const response = await fetch(`${baseUrl}/cart/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Failed to delete cart');

    // Remove cart from list
    carts.value = carts.value.filter(c => c._id !== cartId);
    
    // Close modal if this cart was selected
    if (selectedCart.value?._id === cartId) {
      selectedCart.value = null;
    }

  } catch (err: unknown) {
    console.error('Error deleting cart:', err);
    alert('Could not delete cart.');
  }
};

onMounted(() => {
  fetchAllCarts();
});
</script>
