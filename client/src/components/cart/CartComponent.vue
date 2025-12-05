<template>
  <div class="cart-container">
    <h1 class="page-title">Your Cart</h1>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading delicious items...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchCart" class="retry-btn">Try Again</button>
    </div>

    <div v-else-if="!cart || cart.items.length === 0" class="empty-state">
      <p>Your cart is empty.</p>
      <router-link to="/menu" class="browse-btn">Browse Menu</router-link>
    </div>

    <div v-else class="cart-layout">

      <div class="cart-items">
        <div v-for="item in cart.items" :key="item._id" class="item-card">

          <div class="item-image">
            <img :src="getImageUrl(item.menuItem.image)" :alt="item.menuItem.title" @error="handleImageError" />
          </div>

          <div class="item-details">
            <div class="header-row">
              <h3>{{ item.menuItem.title }}</h3>
              <span class="item-total">{{ formatCurrency(item.total) }}</span>
            </div>

            <p class="category">{{ item.menuItem.category }}</p>

            <div v-if="item.instructions" class="instructions">
              <span class="note-label">Note:</span> {{ item.instructions }}
            </div>

            <div class="controls-row">
              <span class="price-per-unit">{{ formatCurrency(item.price) }} each</span>
              <div class="quantity-badge">x {{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Total Items</span>
          <span>{{ cart.totalQuantity }}</span>
        </div>

        <div class="divider"></div>

        <div class="summary-row total">
          <span>Total</span>
          <span>{{ formatCurrency(cart.totalPrice) }}</span>
        </div>

        <button class="checkout-btn">
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

const useAuth = useAuthStore();
const token = useAuth.token;

// State
// NOTE: We initialize as null because we are fetching an Object, not an Array
const cart = ref<CartData | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const baseUrl = import.meta.env.VITE_API_BASE_URL; // e.g. http://localhost:3000
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
  if (!path) return '/489.jpg';
  if (path.startsWith('http')) return path;
  return `${path}`;
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/placeholder-food.jpg';
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

    console.log("🔥 API RESPONSE:", apiData);

    if (apiData.success && apiData.data) {
      // Direct assignment because apiData.data IS the object
      cart.value = apiData.data;
    } else {
      throw new Error('Invalid data format received');
    }

  } catch (err: unkown) {
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
/* Container & Layout */
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

/* Items Column */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item-card {
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #eee;
  transition: transform 0.2s;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.item-image {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.header-row h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.item-total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
}

.category {
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.instructions {
  background-color: #f9fafb;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
}

.note-label {
  font-weight: 600;
  color: #d97706;
  /* Amber color */
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price-per-unit {
  font-size: 0.9rem;
  color: #888;
}

.quantity-badge {
  background-color: #eff6ff;
  color: #2563eb;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Summary Column */
.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.cart-summary h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #555;
}

.summary-row.total {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 1rem 0;
}

.checkout-btn {
  width: 100%;
  background-color: #10b981;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: #059669;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .item-card {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }
}

/* Loading/Error States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem;
  background: #f9fafb;
  border-radius: 12px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
