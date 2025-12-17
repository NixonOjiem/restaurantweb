<template>
  <div class="pt-6 pr-4 w-full space-y-6">
    <section class="flex flex-col space-y-4 sm:flex-row items-center justify-between">
      <div class="w-full">
        <h1 class="text-2xl font-bold text-foreground">Menu Items</h1>
        <p class="text-muted-foreground">Manage your restaurant&apos;s menu</p>
      </div>
      <button @click="openAddDialog"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Product
      </button>
    </section>

    <section class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm space-y-4">
      <div class="flex  items-center justify-between">
        <h2 class="font-semibold">All Items</h2>
      </div>

      <div v-if="isLoading" class="flex justify-center h-64 items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <div v-else-if="products.length < 0" class="flex justify-center h-64 items-center">
        <p class="text-gray-500">No menu items found.</p>
      </div>

      <div v-else-if="products.length > 0" class="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <!-- Product card -->
        <div v-for="product in products" :key="product._id"
          class="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200">

          <div class="absolute top-2 right-2 z-1 flex items-center gap-1.5">
            <span v-for="dietaryInfo in product.dietaryInfo" :key="dietaryInfo"
              class="px-2 py-1 text-xs font-semibold text-white bg-green-600/80 rounded-full">{{ dietaryInfo }}</span>
          </div>
          <div class="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
            <img :src="product.image" alt=""
              class="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              loading="lazy">
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

            <div>
              <span class="text-xs rounded-full px-2 py-1 border"
                :class="categoryColors[product.category as keyof typeof categoryColors]">{{ product.category }}</span>

            </div>
            <p class="text-xs text-gray-500 line-clamp-1 my-2">
              {{ product.description }}
            </p>

            <div class="flex items-end justify-between mt-auto">
              <div class="flex flex-col">
                <span v-if="product
                  .discountPrice" class="text-xs font-semibold line-through text-gray-500">{{ formatPrice(100)
                  }}</span>
                <span v-else class="text-xs">&#8203;</span>
                <span class="text-lg font-extrabold"
                  :class="product.discountPrice ? 'text-indigo-600' : 'text-gray-900'">{{ formatPrice(product.price)
                  }}</span>
              </div>

              <button @click="openDialog(product)"
                class="flex px-2 py-1 text-xs font-semibold text-gray-600 hover:text-indigo-600 underline cursor-pointer rounded-md">Details
                <ArrowRight class="w-4 h-4 ml-1" />
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  </div>

  <dialog ref="dialog" class="shadow-2xl bg-white">
    <ProductDetailCopmonent v-if="activeProduct" :product="activeProduct" @close="closeDialog" @edit="handleEdit"
      @delete="handleDelete" />
  </dialog>

  <!-- Add/Edit Product Dialog -->
  <dialog ref="addDialog" class="shadow-2xl bg-white">
    <AddProductComponent v-if="isAddDialogOpen" :product="editingProduct" @close="closeAddDialog"
      @submit="handleProductAdded" />
  </dialog>
</template>



<script setup lang="ts">
import type { ProductProps } from '@/types';
import { onMounted, ref } from 'vue';
import { formatPrice } from '../../../utils';
import { ArrowRight } from 'lucide-vue-next';
import ProductDetailCopmonent from '@/components/admin/menu-items/productDetailCopmonent.vue';
import AddProductComponent from '@/components/admin/menu-items/AddProductComponent.vue';
import { useAuthStore } from '@/stores/auth';
// 1. Configuration
const baseURL = import.meta.env.VITE_API_BASE_URL;
const productsURL = `${baseURL}/menu/menu-fetch`;

const useAuth = useAuthStore();
const token = useAuth.token;

// ImageKit Config (Replace with your actual ID)
const IMAGEKIT_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_FOLDER = 'menu-pic';

// HELPER: Transform DB path to ImageKit URL
const getOptimizedImageUrl = (dbPath: string | undefined) => {
  if (!dbPath) return '';

  // 1. Check if it's already a full URL (just in case)
  if (dbPath.startsWith('http')) return dbPath;

  // 2. Extract just the filename (removes '/menu-pic/')
  // Input: "/menu-pic/Pan-Seared-scallops.jpg" -> Output: "Pan-Seared-scallops.jpg"
  const filename = dbPath.split('/').pop();

  // 3. Construct ImageKit URL
  // You can also add transformation parameters here later (e.g., ?tr=w-400)
  return `${IMAGEKIT_ENDPOINT}/${IMAGEKIT_FOLDER ? IMAGEKIT_FOLDER + '/' : ''}${filename}`;
};

// 2. Data State
const products = ref<ProductProps[]>([]); // Holds the API data
const isLoading = ref(true);
const error = ref<string | null>(null);

const categoryColors = {
  Starters: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Mains: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  Desserts: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  Drinks: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Sides: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

const activeProduct = ref<ProductProps | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);

// Add Product Dialog State
const addDialog = ref<HTMLDialogElement | null>(null);
const isAddDialogOpen = ref(false);
const editingProduct = ref<ProductProps | undefined>(undefined);

// 3. Dialog Functions
const openDialog = (product: ProductProps) => {
  activeProduct.value = product;
  if (dialog.value && activeProduct.value) {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    dialog.value.showModal();
  }
};

const closeDialog = () => {
  if (dialog.value) {
    // Restore background scrolling
    document.body.style.overflow = 'auto';
    dialog.value.close();
  }
};

// Add Product Dialog Functions
const openAddDialog = () => {
  editingProduct.value = undefined; // Clear editing product for new product
  isAddDialogOpen.value = true;
  if (addDialog.value) {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    addDialog.value.showModal();
  }
};

const closeAddDialog = () => {
  if (addDialog.value) {
    // Restore background scrolling
    document.body.style.overflow = 'auto';
    addDialog.value.close();
    isAddDialogOpen.value = false;
    editingProduct.value = undefined; // Clear editing product when closing
  }
};

const handleProductAdded = async () => {
  // Refresh the product list after adding a new product
  await fetchProducts();
  closeAddDialog();
};

// Handle Edit Product - Reuses AddProductComponent
const handleEdit = (product: ProductProps) => {
  console.log('Edit product:', product);
  closeDialog(); // Close detail dialog first

  // Open add dialog in edit mode
  editingProduct.value = product;
  isAddDialogOpen.value = true;
  if (addDialog.value) {
    document.body.style.overflow = 'hidden';
    addDialog.value.showModal();
  }
};

// Handle Delete Product
const handleDelete = async (productId: string) => {
  try {
    const response = await fetch(`${baseURL}/menu/delete-menu-item/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    // Refresh products list
    await fetchProducts();
    closeDialog();
    alert('Product deleted successfully!');
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product');
  }
};


// 4. Fetch Function (Async)
const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(productsURL);

    if (!response.ok) {
      throw new Error(`Failed to load menu: ${response.statusText}`);
    }

    const result = await response.json();

    // INTERCEPT: Transform the image paths before saving to state
    const transformedData = result.data.map((item: any) => ({
      ...item,
      // Overwrite the local path with the ImageKit URL
      image: getOptimizedImageUrl(item.image)
    }));

    products.value = transformedData;


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

<style scoped>
/* Dialog Positioning and Scrollability */
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  border: none;
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Wider on larger screens for desktop layout */
@media (min-width: 768px) {
  dialog {
    width: 95%;
    max-width: 900px;
  }
}

@media (min-width: 1024px) {
  dialog {
    max-width: 1000px;
  }
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Custom Scrollbar for Dialog */
.custom-scrollbar::-webkit-scrollbar,
dialog::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track,
dialog::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb,
dialog::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover,
dialog::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
