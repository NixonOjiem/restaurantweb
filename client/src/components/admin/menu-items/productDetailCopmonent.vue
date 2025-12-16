<template>
  <div class="relative flex flex-col lg:flex-row w-full bg-gradient-to-br from-gray-50 to-white">
    
    <!-- Close Button -->
    <button 
      @click="$emit('close')"
      class="absolute top-4 right-4 z-50 p-2.5 bg-white hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-all shadow-sm border border-gray-200 hover:border-red-200 group">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Product Image Section - Left side on desktop, top on mobile -->
    <div class="relative w-full lg:w-[45%] h-72 lg:h-auto lg:min-h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shrink-0">
      <img 
        :src="product.image" 
        :alt="product.title"
        class="w-full h-full object-cover"
      >
      
      <!-- Availability Badge -->
      <div class="absolute top-4 left-4">
        <span 
          class="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border-2"
          :class="product.isAvailable 
            ? 'bg-green-500 text-white border-green-400' 
            : 'bg-red-500 text-white border-red-400'">
          {{ product.isAvailable ? 'Available' : 'Unavailable' }}
        </span>
      </div>

      <!-- Dietary Info Badges -->
      <div v-if="product.dietaryInfo.length > 0" class="absolute top-4 right-4 lg:right-auto lg:top-auto lg:bottom-4 lg:left-4 flex flex-wrap gap-2 max-w-[200px] justify-end lg:justify-start">
        <span 
          v-for="info in product.dietaryInfo" 
          :key="info"
          class="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600/90 backdrop-blur-sm rounded-full shadow-md border border-emerald-400/50">
          {{ info }}
        </span>
      </div>
    </div>

    <!-- Product Details Section - Right side on desktop, bottom on mobile -->
    <div class="flex flex-col w-full lg:w-[55%]">
      <div class="p-6 space-y-6 flex-1">
        
        <!-- Title and Price -->
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight pr-8 lg:pr-0">
              {{ product.title }}
            </h2>
            <div class="flex flex-col items-end shrink-0">
              <span 
                v-if="product.discountPrice" 
                class="text-sm font-medium line-through text-gray-400">
                {{ formatPrice(product.price) }}
              </span>
              <span 
                class="text-2xl lg:text-3xl font-extrabold"
                :class="product.discountPrice ? 'text-red-600' : 'text-gray-900'">
                {{ formatPrice(product.discountPrice || product.price) }}
              </span>
            </div>
          </div>

          <!-- Category and Rating -->
          <div class="flex items-center gap-3 flex-wrap">
            <span 
              class="px-3 py-1.5 text-xs font-semibold rounded-full border"
              :class="getCategoryColor(product.category)">
              {{ product.category }}
            </span>
            
            <div v-if="product.rating && product.rating > 0" 
              class="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <span class="text-amber-500 text-sm">★</span>
              <span class="text-sm font-bold text-amber-700">{{ product.rating }}</span>
              <span v-if="product.reviewCount" class="text-xs text-gray-500">
                ({{ product.reviewCount }})
              </span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="border-t border-gray-200 pt-4">
          <h3 class="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">
            Description
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Ingredients -->
        <div v-if="product.ingredients.length > 0" class="border-t border-gray-200 pt-4">
          <h3 class="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">
            Ingredients
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="ingredient in product.ingredients" 
              :key="ingredient"
              class="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-200">
              {{ ingredient }}
            </span>
          </div>
        </div>

        <!-- Badges -->
        <div v-if="product.badge.length > 0" class="border-t border-gray-200 pt-4">
          <h3 class="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">
            Special Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="badgeItem in product.badge" 
              :key="badgeItem"
              class="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg border border-purple-200">
              {{ badgeItem }}
            </span>
          </div>
        </div>

        <!-- Product Meta Information -->
        <div class="border-t border-gray-200 pt-4">
          <h3 class="text-xs uppercase tracking-wider font-bold text-gray-500 mb-3">
            Product Information
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <p class="text-xs text-gray-500">Product ID</p>
              <p class="text-sm font-mono font-semibold text-gray-800 truncate">{{ product._id }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-xs text-gray-500">SKU</p>
              <p class="text-sm font-mono font-semibold text-gray-800">{{ product.sku || 'N/A' }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-xs text-gray-500">Slug</p>
              <p class="text-sm font-mono font-medium text-gray-800 truncate">{{ product.slug }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-xs text-gray-500">Status</p>
              <p class="text-sm font-semibold" :class="product.isAvailable ? 'text-green-600' : 'text-red-600'">
                {{ product.isAvailable ? 'In Stock' : 'Out of Stock' }}
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="p-4 bg-white border-t border-gray-200 flex gap-3">
        <button 
          @click="handleEdit"
          class="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-12 transition-transform">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Product
        </button>
        
        <button 
          @click="handleDelete"
          class="py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:scale-110 transition-transform">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Delete
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import type { ProductProps } from '@/types';
import { formatPrice } from '../../../../utils';

const props = defineProps<{product: ProductProps}>();
const emit = defineEmits(['close', 'edit', 'delete']);

// Category color mapping
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Starters': 'bg-blue-50 text-blue-700 border-blue-200',
    'Mains': 'bg-teal-50 text-teal-700 border-teal-200',
    'Desserts': 'bg-pink-50 text-pink-700 border-pink-200',
    'Drinks': 'bg-amber-50 text-amber-700 border-amber-200',
    'Sides': 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
};

// Action handlers
const handleEdit = () => {
  emit('edit', props.product);
};

const handleDelete = () => {
  if (confirm(`Are you sure you want to delete "${props.product.title}"?`)) {
    emit('delete', props.product._id);
  }
};
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>