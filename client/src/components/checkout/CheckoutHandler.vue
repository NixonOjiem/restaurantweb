<template lang="html">
  <div class="flex flex-col min-h-screen bg-gray-50">
    <NavbarComponent />

    <section class="flex-grow checkout-handler pb-10">

      <div v-if="currentStep === 1">
        <CheckoutMap @location-confirmed="handleLocationConfirmed" />
      </div>

      <div v-if="currentStep === 2"
        class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10 mb-4 animate-fade-in">

        <div class="mb-6 border-b border-gray-100 pb-4">
          <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Step 2: Delivery Details
          </h3>
          <p class="text-sm text-gray-500 mt-1 ml-8">Tell us exactly where to find you.</p>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Building Name / Estate</label>
              <input type="text" v-model="deliveryDetails.building"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                placeholder="e.g. Greenwood Apts" />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">House / Door Number</label>
              <input type="text" v-model="deliveryDetails.doorNumber"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white"
                placeholder="e.g. B4" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">Instructions (Optional)</label>
            <textarea v-model="deliveryDetails.instructions" rows="3"
              class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-700 bg-gray-50 focus:bg-white resize-none"
              placeholder="e.g. Call when at the gate..."></textarea>
          </div>

          <div class="flex items-center justify-between pt-4 mt-6 border-t border-gray-100">
            <button @click="currentStep = 1"
              class="flex items-center gap-2 px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              Back to Map
            </button>
            <button @click="submitDetails"
              class="flex items-center gap-2 px-8 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 3" class="mt-10 animate-fade-in">
        <CheckoutPaymentInfo :delivery-details="deliveryDetails" @back="currentStep = 2" />
      </div>

    </section>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import NavbarComponent from '../layouts/NavbarComponent.vue';
import FooterComponent from '../layouts/FooterComponent.vue';
import CheckoutMap from './CheckoutMap.vue';
import CheckoutPaymentInfo from './CheckoutPaymentInfo.vue';

const currentStep = ref(1);

const deliveryDetails = reactive({
  location: { lat: 0, lng: 0 },
  building: '',
  doorNumber: '',
  instructions: ''
});

const handleLocationConfirmed = (coords: { lat: number; lng: number }) => {
  deliveryDetails.location = coords;
  currentStep.value = 2;
};

const submitDetails = () => {
  if (!deliveryDetails.building || !deliveryDetails.doorNumber) {
    alert("Please fill in building and door number");
    return;
  }
  currentStep.value = 3;
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
