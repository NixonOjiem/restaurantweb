<template lang="html">
  <section class="flex flex-col min-h-screen bg-gray-50">
    <NavbarComponent />

    <main class="flex-grow w-full px-4 md:px-8 py-6">

      <div class="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-[80vh]">

        <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <h2 class="text-lg font-semibold text-gray-700">Select Location</h2>
          <span v-if="selectedLocation" class="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {{ selectedLocation.lat.toFixed(4) }}, {{ selectedLocation.lng.toFixed(4) }}
          </span>
        </div>

        <div class="relative w-full flex-grow z-0">
          <div id="map" class="absolute inset-0 z-0"></div>

          <div v-if="isLoading" class="absolute inset-0 bg-white/80 z-[1000] flex items-center justify-center">
            <span class="animate-pulse text-gray-500 font-medium">Locating...</span>
          </div>
        </div>

        <div
          class="p-4 bg-white border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">

          <div class="text-sm text-gray-600">
            <template v-if="!selectedLocation">
              <span class="flex items-center gap-2">
                Tap map to select or
                <button @click="getUserLocation"
                  class="text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none">
                  Use Current Location
                </button>
              </span>
            </template>
            <template v-else>
              <span class="text-emerald-600 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                Location pinned
              </span>
            </template>
          </div>

          <button @click="confirmLocation" :disabled="!selectedLocation"
            class="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-all duration-200">
            Confirm Location
          </button>
        </div>

      </div>
    </main>

    <FooterComponent />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons (keep this if using Vite/Webpack)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import NavbarComponent from '../layouts/NavbarComponent.vue';
import FooterComponent from '../layouts/FooterComponent.vue';

const emit = defineEmits<{
  (e: 'location-confirmed', coords: { lat: number; lng: number }): void
}>();

const map = ref<L.Map | null>(null);
const selectedLocation = ref<{ lat: number; lng: number } | null>(null);
const marker = ref<L.Marker | null>(null);
const isLoading = ref(false);

const defaultCenter = { lat: -1.286389, lng: 36.817223 };

onMounted(() => {
  fixLeafletIcons();
  initMap();
});

const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

const initMap = () => {
  // Wait for DOM updates to ensure container has width
  setTimeout(() => {
    map.value = L.map('map').setView([defaultCenter.lat, defaultCenter.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map.value);

    map.value.on('click', (e: L.LeafletMouseEvent) => {
      updateMarker(e.latlng.lat, e.latlng.lng);
    });

    // Force map to recalculate size after render
    map.value.invalidateSize();
  }, 100);
};

const updateMarker = (lat: number, lng: number) => {
  selectedLocation.value = { lat, lng };

  if (marker.value) {
    marker.value.setLatLng([lat, lng]);
  } else {
    marker.value = L.marker([lat, lng]).addTo(map.value!);
  }
  map.value?.panTo([lat, lng]);
};

const getUserLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }
  isLoading.value = true;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      isLoading.value = false;
      const { latitude, longitude } = position.coords;
      updateMarker(latitude, longitude);
      map.value?.setView([latitude, longitude], 15);
    },
    (error) => {
      isLoading.value = false;
      console.error(error);
      alert("Unable to retrieve location.");
    }
  );
};

const confirmLocation = () => {
  if (selectedLocation.value) {
    emit('location-confirmed', selectedLocation.value);
  }
};
</script>
