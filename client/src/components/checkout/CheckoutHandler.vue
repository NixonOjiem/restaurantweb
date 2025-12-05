<template lang="html">
  <div>
    <NavbarComponent />
    <section class="checkout-handler">

      <div v-if="currentStep === 1">
        <h3>Step 1: Pin your delivery location</h3>
        <CheckoutMap @location-confirmed="handleLocationConfirmed" />
      </div>

      <div v-else-if="currentStep === 2" class="details-form">
        <h3>Step 2: Delivery Details</h3>

        <div class="form-group">
          <label>Building Name / Estate:</label>
          <input type="text" v-model="deliveryDetails.building" placeholder="e.g. Greenwood Apartments" />
        </div>

        <div class="form-group">
          <label>House / Door Number:</label>
          <input type="text" v-model="deliveryDetails.doorNumber" placeholder="e.g. B4" />
        </div>

        <div class="form-group">
          <label>Instructions to Rider:</label>
          <textarea v-model="deliveryDetails.instructions" placeholder="e.g. Call when at gate"></textarea>
        </div>

        <div class="actions">
          <button @click="currentStep = 1" class="back-btn">Back to Map</button>
          <button @click="submitDetails" class="next-btn">Proceed to Payment</button>
        </div>
      </div>

      <div v-else-if="currentStep === 3">
        <CheckoutPaymentInfo />
      </div>
      <FooterComponent />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import NavbarComponent from '../layouts/NavbarComponent.vue';
import FooterComponent from '../layouts/FooterComponent.vue';
import CheckoutMap from './CheckoutMap.vue';
import CheckoutPaymentInfo from './CheckoutPaymentInfo.vue';

// State to track which view is active
const currentStep = ref(1);

// Store all data collected during checkout
const deliveryDetails = reactive({
  location: { lat: 0, lng: 0 },
  building: '',
  doorNumber: '',
  instructions: ''
});

// Callback when Map emits data
const handleLocationConfirmed = (coords: { lat: number; lng: number }) => {
  deliveryDetails.location = coords;
  console.log("Location captured:", deliveryDetails.location);
  // Move to next step
  currentStep.value = 2;
};

// Handle moving to payment
const submitDetails = () => {
  if (!deliveryDetails.building || !deliveryDetails.doorNumber) {
    alert("Please fill in building and door number");
    return;
  }
  // Move to payment step
  currentStep.value = 3;
};
</script>

<style scoped>
.checkout-handler {
  max-width: 100%;
  margin: auto;
  padding: 0rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.next-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.back-btn {
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}
</style>
