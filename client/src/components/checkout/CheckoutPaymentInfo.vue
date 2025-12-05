<template lang="html">
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">

    <div class="mb-6 border-b border-gray-100 pb-4">
      <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Step 3: Payment
      </h3>
      <p class="text-sm text-gray-500 mt-1 ml-8">Secure payment via M-Pesa.</p>
    </div>

    <div class="space-y-6">
      <div class="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start gap-3">
        <div class="mt-1">
          <div class="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div>
          <h4 class="text-sm font-bold text-green-800">M-Pesa Prompt</h4>
          <p class="text-xs text-green-700 mt-1">
            We will send an M-Pesa prompt to the number below.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">M-Pesa Number</label>
          <input type="tel" v-model="mpesaNumber"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            placeholder="07XX XXX XXX" />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700">Contact Number</label>
          <input type="tel" v-model="contactNumber"
            class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            placeholder="Same as M-Pesa" />
        </div>
      </div>

      <div class="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
        <button @click="$emit('back')" class="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
          Back
        </button>

        <button @click="processPayment"
          class="flex items-center gap-2 px-8 py-3 rounded-lg bg-green-600 text-white font-bold shadow-md hover:bg-green-700 transform active:scale-[0.98] transition-all">
          Pay & Finish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 1. Define the props to accept data from Handler
const props = defineProps<{
  deliveryDetails: {
    location: { lat: number; lng: number };
    building: string;
    doorNumber: string;
    instructions: string;
  }
}>();

// const emit = defineEmits(['back']);


const mpesaNumber = ref('');
const contactNumber = ref('');

const processPayment = () => {
  if (!mpesaNumber.value) {
    alert("Please enter an M-Pesa number");
    return;
  }

  // 2. Capture all data (Props + Local Inputs)
  const allOrderDetails = {
    location: props.deliveryDetails.location,
    buildingInfo: {
      buildingName: props.deliveryDetails.building,
      doorNumber: props.deliveryDetails.doorNumber,
      instructions: props.deliveryDetails.instructions
    },
    contactInfo: {
      mpesaNumber: mpesaNumber.value,
      contactNumber: contactNumber.value || mpesaNumber.value
    }
  };

  // 3. Console Log it
  console.log("🚀 FULL ORDER DETAILS:", allOrderDetails);
};
</script>
