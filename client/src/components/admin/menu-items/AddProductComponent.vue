<template>
  <div class="relative flex flex-col lg:flex-row w-full min-h-[600px] bg-gradient-to-br from-gray-50 to-white">
    
    <!-- Close Button -->
    <button 
      @click="$emit('close')"
      type="button"
      class="absolute top-4 right-4 z-50 p-2.5 bg-white hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-all shadow-sm border border-gray-200 hover:border-red-200 group">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <form @submit.prevent="handleSubmit" class="flex flex-col lg:flex-row w-full">
      
      <!-- Left Side - Image Upload Section -->
      <div class="w-full lg:w-[40%] p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-r border-gray-200 shrink-0">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Product Images</h3>
        
        <!-- Image Upload Area -->
        <div 
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          class="relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer mb-4"
          :class="isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 bg-white'"
          @click="triggerFileInput">
          
          <input 
            ref="fileInput"
            type="file" 
            multiple 
            accept="image/*"
            @change="handleFileSelect"
            class="hidden">
          
          <div class="space-y-3">
            <div class="flex justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-700">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each (Multiple images)</p>
            </div>
          </div>
        </div>

        <!-- Image Preview Grid -->
        <div v-if="imagePreviews.length > 0" class="space-y-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-700">Uploaded Images ({{ imagePreviews.length }})</p>
            <button type="button" @click="clearAllImages" class="text-xs text-red-600 hover:text-red-700 font-medium">
              Clear All
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            <div 
              v-for="(preview, index) in imagePreviews" 
              :key="index"
              class="relative group aspect-square rounded-lg overflow-hidden bg-white border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <img :src="preview" :alt="`Preview ${index + 1}`" class="w-full h-full object-cover">
              
              <!-- Remove Button -->
              <button 
                type="button"
                @click="removeImage(index)"
                class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <!-- Primary Badge -->
              <div v-if="index === 0" class="absolute bottom-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded">
                Main
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Form Fields -->
      <div class="flex-1 flex flex-col">
        <div class="p-6 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
          
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
            <p class="text-sm text-gray-500">{{ isEditMode ? 'Update the product details below' : 'Fill in the product details below' }}</p>
          </div>

          <!-- Title -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Product Title <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.title"
              type="text" 
              required
              placeholder="e.g., Margherita Pizza"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="formData.description"
              required
              rows="4"
              placeholder="Describe your product..."
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"></textarea>
          </div>

          <!-- Price and Discount Price -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Price (KES) <span class="text-red-500">*</span>
              </label>
              <input 
                v-model.number="formData.price"
                type="number" 
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Discount Price (KES)
              </label>
              <input 
                v-model.number="formData.discountPrice"
                type="number" 
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
            </div>
          </div>

          <!-- Category and SKU -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Category <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="formData.category"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <option value="">Select category</option>
                <option value="Starters">Starters</option>
                <option value="Mains">Mains</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
                <option value="Sides">Sides</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                SKU
              </label>
              <input 
                v-model="formData.sku"
                type="text" 
                placeholder="e.g., PROD-001"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
            </div>
          </div>

          <!-- Ingredients -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Ingredients
            </label>
            <div class="space-y-2">
              <div v-for="(ingredient, index) in formData.ingredients" :key="index" class="flex gap-2">
                <input 
                  v-model="formData.ingredients[index]"
                  type="text" 
                  placeholder="e.g., Tomatoes"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <button 
                  type="button"
                  @click="removeIngredient(index)"
                  class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <button 
                type="button"
                @click="addIngredient"
                class="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                + Add Ingredient
              </button>
            </div>
          </div>

          <!-- Dietary Info -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              Dietary Information
            </label>
            <div class="grid grid-cols-2 gap-3">
              <label v-for="option in dietaryOptions" :key="option" class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  :value="option"
                  v-model="formData.dietaryInfo"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <span class="text-sm text-gray-700">{{ option }}</span>
              </label>
            </div>
          </div>

          <!-- Badges/Tags -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Special Tags
            </label>
            <div class="space-y-2">
              <div v-for="(badge, index) in formData.badge" :key="index" class="flex gap-2">
                <input 
                  v-model="formData.badge[index]"
                  type="text" 
                  placeholder="e.g., Best Seller"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                <button 
                  type="button"
                  @click="removeBadge(index)"
                  class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <button 
                type="button"
                @click="addBadge"
                class="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                + Add Tag
              </button>
            </div>
          </div>

          <!-- Availability Toggle -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p class="text-sm font-semibold text-gray-700">Product Availability</p>
              <p class="text-xs text-gray-500 mt-0.5">Make this product available to customers</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="formData.isAvailable"
                class="sr-only peer">
              <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

        </div>

        <!-- Submit Button -->
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all">
            Cancel
          </button>
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Product' : 'Create Product') }}</span>
          </button>
        </div>

      </div>

    </form>

  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref, reactive, onMounted } from 'vue';
import type { ProductProps } from '@/types';

interface Props {
  product?: ProductProps;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'submit']);

// Determine if we're in edit mode
const isEditMode = ref(!!props.product);

// Form state
const formData = reactive({
  title: '',
  description: '',
  price: 0,
  discountPrice: undefined as number | undefined,
  category: '',
  sku: '',
  ingredients: [] as string[],
  dietaryInfo: [] as string[],
  badge: [] as string[],
  isAvailable: true,
});

// Image handling
const fileInput = ref<HTMLInputElement | null>(null);
const imagePreviews = ref<string[]>([]);
const imageFiles = ref<File[]>([]);
const isDragging = ref(false);
const isSubmitting = ref(false);

// Dietary options
const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher', 'Organic'];

// Initialize form data from product prop if editing
onMounted(() => {
  if (props.product) {
    formData.title = props.product.title;
    formData.description = props.product.description;
    formData.price = props.product.price;
    formData.discountPrice = props.product.discountPrice;
    formData.category = props.product.category;
    formData.sku = props.product.sku || '';
    formData.ingredients = [...props.product.ingredients];
    formData.dietaryInfo = [...props.product.dietaryInfo];
    formData.badge = [...props.product.badge];
    formData.isAvailable = props.product.isAvailable;
    
    // Load existing image preview
    if (props.product.image) {
      imagePreviews.value = [props.product.image];
    }
  }
});

// Image upload functions
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    addFiles(Array.from(target.files));
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files));
  }
};

const addFiles = (files: File[]) => {
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      imageFiles.value.push(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          imagePreviews.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  });
};

const removeImage = (index: number) => {
  imagePreviews.value.splice(index, 1);
  imageFiles.value.splice(index, 1);
};

const clearAllImages = () => {
  imagePreviews.value = [];
  imageFiles.value = [];
};

// Dynamic list functions
const addIngredient = () => {
  formData.ingredients.push('');
};

const removeIngredient = (index: number) => {
  formData.ingredients.splice(index, 1);
};

const addBadge = () => {
  formData.badge.push('');
};

const removeBadge = (index: number) => {
  formData.badge.splice(index, 1);
};

// Form submission
const handleSubmit = async () => {
  // Only require new images if we're creating a new product
  if (!isEditMode.value && imageFiles.value.length === 0) {
    alert('Please upload at least one product image');
    return;
  }

  isSubmitting.value = true;

  try {
    const useAuth = useAuthStore();
    const token = useAuth.token;
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    // Create FormData for file upload
    const formDataToSend = new FormData();
    
    // Append images only if new ones are selected
    imageFiles.value.forEach((file, index) => {
      formDataToSend.append('images', file);
    });

    // Append other form data as JSON
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    if (formData.discountPrice) {
      formDataToSend.append('discountPrice', formData.discountPrice.toString());
    }
    formDataToSend.append('category', formData.category);
    if (formData.sku) {
      formDataToSend.append('sku', formData.sku);
    }
    formDataToSend.append('ingredients', JSON.stringify(formData.ingredients.filter(i => i.trim())));
    formDataToSend.append('dietaryInfo', JSON.stringify(formData.dietaryInfo));
    formDataToSend.append('badge', JSON.stringify(formData.badge.filter(b => b.trim())));
    formDataToSend.append('isAvailable', formData.isAvailable.toString());

    // Use different endpoints for create vs update
    const url = isEditMode.value 
      ? `${baseURL}/menu/update-menu-item/${props.product?._id}`
      : `${baseURL}/menu/add-menu-item`;
    
    const method = isEditMode.value ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      body: formDataToSend,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(isEditMode.value ? 'Failed to update product' : 'Failed to create product');
    }

    const result = await response.json();
    console.log(isEditMode.value ? 'Product updated:' : 'Product created:', result);
    
    alert(isEditMode.value ? 'Product updated successfully!' : 'Product created successfully!');
    emit('submit', result);
    emit('close');

  } catch (error) {
    console.error(isEditMode.value ? 'Error updating product:' : 'Error creating product:', error);
    alert(isEditMode.value ? 'Failed to update product. Please try again.' : 'Failed to create product. Please try again.');
  } finally {
    isSubmitting.value = false;
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

/* Smooth transitions */
input, textarea, select {
  transition: all 0.2s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
}
</style>