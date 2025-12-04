<template>
  <Teleport to="body">

    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 z-9999 flex items-center justify-center p-4 h-full w-full font-sans">

        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-black/30 via-black/60 to-black/80 backdrop-blur-sm"
          @click="closeModal"></div>

        <Transition appear enter-active-class="transition duration-300 ease-out delay-75"
          enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4">
          <div
            class="relative w-full max-w-5xl bg-linear-to-br from-[#FFFDF5] to-[#FFFAEB] shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[88vh] md:h-auto md:max-h-[90vh]">

            <button @click="closeModal"
              class="absolute top-3 right-3 z-50 p-2 bg-white/90 backdrop-blur-md rounded-full text-stone-600 hover:bg-stone-900 hover:text-white transition-all shadow-md border border-stone-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div class="w-full md:w-[45%] bg-stone-200 relative h-60 sm:h-72 md:h-auto md:min-h-full shrink-0">
              <transition name="fade" mode="out-in">
                <img :key="currentImageIndex" :src="product?.images[currentImageIndex]" :alt="product?.title"
                  class="w-full h-full object-cover absolute inset-0" />
              </transition>

              <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-10">
                <div v-for="(_, idx) in product?.images" :key="idx"
                  class="w-2 h-2 rounded-full transition-all duration-300 shadow-sm"
                  :class="currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/60'"></div>
              </div>
            </div>

            <div class="w-full md:w-[55%] flex flex-col h-full overflow-hidden">

              <div class="p-5 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1">

                <div class="mb-4 md:mb-6">
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <h2 class="text-2xl md:text-4xl font-serif font-bold text-stone-900 leading-tight pr-8 md:pr-0">
                      {{ product?.title }}
                    </h2>
                    <div class="text-xl md:text-3xl font-bold text-amber-600 shrink-0">
                      ${{ product?.price }}
                    </div>
                  </div>

                  <div class="flex items-center gap-3 text-sm">
                    <div class="flex text-amber-400 text-xs">
                      <span v-for="i in 5" :key="i">★</span>
                    </div>
                    <span class="text-stone-400 border-l border-stone-300 pl-3">12 reviews</span>
                  </div>
                </div>

                <div class="prose prose-stone prose-sm md:prose-base mb-6 text-stone-600 leading-relaxed"
                  v-html="product?.description"></div>

                <div v-if="product?.images && product.images.length > 1" class="hidden md:block mb-8">
                  <h3 class="text-xs uppercase tracking-widest font-bold text-stone-400 mb-3">Gallery
                  </h3>
                  <div class="flex gap-3 overflow-x-auto pb-2 snap-x">
                    <button v-for="(img, index) in product.images" :key="index" @click="currentImageIndex = index"
                      class="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all"
                      :class="currentImageIndex === index ? 'border-stone-900 ring-1 ring-stone-300' : 'border-transparent opacity-60 hover:opacity-100'">
                      <img :src="img" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>

                <div
                  class="flex gap-6 text-[10px] uppercase tracking-widest text-stone-400 mt-4 md:mt-auto pt-4 border-t border-stone-100 md:border-none">
                  <p>SKU: <span class="text-stone-700 font-bold">{{ product?.sku }}</span></p>
                  <p>Cat: <span class="text-stone-700 font-bold">{{ product?.category }}</span></p>
                </div>

                <div class="mb-4 md:mb-6 mt-4 md:mt-6">
                  <label class="text-xs uppercase tracking-widest font-bold text-stone-400 mb-3">Instructions</label>
                  <input type="text" v-model="instructions" placeholder="e.g. No onions, sauce on the side..."
                    class="w-full bg-stone-50 text-stone-800 border border-stone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:bg-white transition-all duration-200 placeholder-stone-400" />
                </div>
              </div>

              <div class="p-4 sm:p-6 md:p-8 bg-white/60 backdrop-blur-md border-t border-stone-200/60 shrink-0 z-10">
                <div class="flex gap-3 sm:gap-4">

                  <div
                    class="flex items-center justify-between bg-white rounded-xl border border-stone-200 px-1 h-12 w-28 sm:w-32 shrink-0 shadow-sm">
                    <button @click="decrementQty"
                      class="w-8 h-full flex items-center justify-center text-stone-400 hover:text-black text-xl transition-colors hover:bg-stone-50 rounded-lg">-</button>
                    <input type="text" v-model="quantity"
                      class="w-8 text-center border-none focus:outline-none font-bold text-stone-900 bg-transparent"
                      readonly />
                    <button @click="incrementQty"
                      class="w-8 h-full flex items-center justify-center text-stone-400 hover:text-black text-xl transition-colors hover:bg-stone-50 rounded-lg">+</button>
                  </div>

                  <button @click="addToCart"
                    class="grow h-12 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-stone-900/20 active:scale-95">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6">
                      </path>
                    </svg>
                    Add to Order
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
//import type { ProductProps } from '@/types';
import type { ModalProduct } from '@/types';
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();


const user = authStore.user;
const token = authStore.token;
// console.log('is user:', user)

const props = defineProps<{
  isOpen: boolean;
  product: ModalProduct | null;
}>();
console.log('product is:', props.product)

const emit = defineEmits(['close', 'add-to-cart']);

const currentImageIndex = ref(0);
const quantity = ref(1);
const instructions = ref('')

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    currentImageIndex.value = 0;
    quantity.value = 1;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const closeModal = () => emit('close');
const incrementQty = () => quantity.value++;
const decrementQty = () => { if (quantity.value > 1) quantity.value--; };

const addToCart = async () => {
  // 1. Check Auth (Return early to stop execution if not logged in)
  if (!user) {
    alert("Please log in to add items to cart");
    return;
  }

  const payload = {
    menuItemId: props.product?._id,
    quantity: 1, // If you add a quantity counter later, replace '1' with that variable
    instructions: instructions.value
  };

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  try {
    // 2. Make the API Request
    const response = await fetch(`${baseURL}/cart/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization header is critical for your 'protect' middleware
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // 3. Handle Errors (e.g., 401 Unauthorized, 404 Item not found)
    if (!response.ok) {
      throw new Error(data.message || "Failed to add item to cart");
    }

    // 4. Success State
    console.log("Success:",);
    alert("added your item to the cart")
    // console.log("Success:", data);
    // Optional: Trigger a toast notification here
    instructions.value = ""; // Clear the input
    closeModal();

    // Tip: If you have a global store (Pinia/Vuex), refresh the cart count here
    // userStore.fetchCart();

  } catch (error: unknown) {
    console.error("Error adding to cart:", error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }

};
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d6d3d1;
  border-radius: 20px;
}

/* Image Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
