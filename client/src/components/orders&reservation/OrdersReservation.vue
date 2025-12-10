<template>
  <div class="min-h-screen p-4 md:p-8 font-sans text-slate-700 mt-10">

    <div class="max-w-6xl mx-auto mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-2">My Dining History</h1>
      <p class="text-slate-500 text-lg">View your past orders and upcoming reservations</p>
    </div>

    <div class="max-w-6xl mx-auto">

      <div class="flex flex-col sm:flex-row gap-4 mb-8 p-2 bg-white rounded-2xl shadow-sm border border-stone-100">
        <button v-for="tab in ['orders', 'reservations']" :key="tab" @click="activeTab = tab as any"
          class="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          :class="activeTab === tab
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 transform scale-[1.02]'
            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'">
          <font-awesome-icon :icon="tab === 'orders' ? faPlateWheat : faCalendar" class="text-xl" />
          <span class="capitalize">{{ tab === 'orders' ? 'My Orders' : 'Reservations' }}</span>
          <span class="ml-2 text-xs py-0.5 px-2 rounded-full"
            :class="activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'">
            {{ tab === 'orders' ? orders.length : upcomingReservations.length }}
          </span>
        </button>
      </div>

      <div v-if="isLoading && activeTab === 'orders'" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <div v-else-if="error && activeTab === 'orders'"
        class="text-center py-10 bg-red-50 rounded-2xl border border-red-100 mb-6">
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button @click="fetchOrders" class="mt-2 text-sm text-red-700 underline font-bold">Try Again</button>
      </div>

      <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0">
        <div v-if="activeTab === 'orders' && !isLoading" class="space-y-6">
          <div class="flex items-center gap-4 pb-2 pt-4 border-b-2 border-orange-100">
            <h2 class="text-2xl font-bold text-slate-800">Order History</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="order in orders" :key="order.id"
              class="group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              :class="order.isFeatured ? 'border-orange-400 ring-4 ring-orange-400/10' : 'border-slate-100 shadow-sm'">

              <div v-if="order.isFeatured"
                class="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                ⭐ Featured
              </div>

              <div
                class="bg-gradient-to-r from-orange-50 to-orange-100/50 p-5 flex justify-between items-start border-b border-orange-100">
                <div>
                  <div class="font-bold text-slate-800">#{{ order.id.slice(-6).toUpperCase() }}</div>
                  <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{{
                    formatDate(order.date) }}</div>
                </div>
                <span
                  :class="['px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', getStatusClass(order.status)]">
                  {{ order.status.replace(/_/g, ' ') }}
                </span>
              </div>

              <div class="p-5">
                <div class="space-y-3 mb-6">
                  <div v-for="item in order.items" :key="item._id" class="flex justify-between items-center text-sm">
                    <div class="flex items-center gap-3">
                      <span
                        class="font-bold text-orange-500 bg-orange-50 w-6 h-6 flex items-center justify-center rounded-md">{{
                          item.quantity }}</span>
                      <span class="text-slate-700 truncate max-w-[150px]">{{ item.name }}</span>
                    </div>
                    <span class="font-medium text-slate-900">${{ item.price.toFixed(2) }}</span>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span class="text-xs text-slate-400 uppercase font-bold">Total</span>
                    <div class="text-xl font-bold text-slate-900">${{ order.total.toFixed(2) }}</div>
                  </div>
                  <div class="flex gap-2">
                    <button v-if="order.status === 'DELIVERED'" @click="reorder(order.id)"
                      class="px-3 py-2 text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                      Reorder
                    </button>
                    <button @click="viewOrderDetails(order.id)"
                      class="px-3 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shadow-sm">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="orders.length === 0 && !error"
            class="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <font-awesome-icon :icon="faPlateWheat" class="text-6xl text-orange-400 mx-auto my-6" />

            <h3 class="text-xl font-bold text-slate-800">No orders yet</h3>
            <p class="text-slate-500 mb-6">Your order history will appear here.</p>
            <button
              class="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
              Browse Menu
            </button>
          </div>
        </div>
      </transition>

      <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0">
        <div v-if="activeTab === 'reservations'" class="space-y-8">
          <div>
            <div class="flex items-center gap-4 mb-6 pb-2 pt-4 border-b-2 border-orange-100">
              <h2 class="text-2xl font-bold text-slate-800">Upcoming Reservations</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="reservation in upcomingReservations" :key="reservation.id"
                class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all border-l-4 border-l-emerald-500">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Reservation ID</span>
                    <div class="font-bold text-slate-800">{{ reservation.id }}</div>
                  </div>
                  <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase">
                    {{ reservation.status }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span class="text-xs text-slate-500 block mb-1">Date & Time</span>
                    <span class="font-semibold text-slate-800 flex items-center gap-1">
                      <span>📅</span> {{ formatDateTime(reservation.date, reservation.time) }}
                    </span>
                  </div>
                  <div>
                    <span class="text-xs text-slate-500 block mb-1">Guests</span>
                    <span class="font-semibold text-slate-800 flex items-center gap-1">
                      <span>👥</span> {{ reservation.guests }} People
                    </span>
                  </div>
                </div>
                <div class="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    class="flex-1 py-2 text-sm font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg">Modify</button>
                  <button
                    class="flex-1 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">Cancel</button>
                </div>
              </div>
            </div>

            <div v-if="upcomingReservations.length === 0"
              class="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
              <font-awesome-icon :icon="faCalendar" class="text-4xl text-slate-300 mx-auto mb-4" />
              <p class="text-slate-500">No upcoming reservations.</p>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlateWheat, faCalendar } from '@fortawesome/free-solid-svg-icons'
import type { FrontendOrder, BackendOrder } from '@/types';
// 1. Setup Auth and Config
const useAuth = useAuthStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const myOrdersUrl = `${baseUrl}/orders/myorders`;

const activeTab = ref<'orders' | 'reservations'>('orders');
const orders = ref<FrontendOrder[]>([]); // Initialize empty
const isLoading = ref(false);
const error = ref('');

// 2. Fetch Function
const fetchOrders = async () => {
  isLoading.value = true;
  error.value = '';

  // Get token dynamically from store
  const token = useAuth.token;

  if (!token) {
    error.value = "Please log in to view your orders.";
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get(myOrdersUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.success) {
      // Map MongoDB backend structure to Frontend UI structure
      orders.value = response.data.orders.map((order: BackendOrder) => ({
        id: order._id,
        date: order.createdAt,
        total: order.totalAmount,
        status: order.orderStatus, // "RECEIVED", etc.
        items: order.items,
        isFeatured: false
      }));
    }
  } catch (err: unknown) {
    console.error("Error fetching orders:", err);
    //error.value = err.response?.data?.message || "Failed to load order history.";
  } finally {
    isLoading.value = false;
  }
};

// --- RESERVATIONS (Dummy Data for now) ---
const reservations = ref([
  {
    id: 'RES-12345',
    date: '2024-01-20',
    time: '19:30',
    guests: 4,
    tableNumber: 'Table 12',
    status: 'Confirmed',
    specialRequests: 'Window seat preferred'
  },
  {
    id: 'RES-12344',
    date: '2024-01-25',
    time: '20:00',
    guests: 2,
    tableNumber: 'Table 8',
    status: 'Confirmed',
    specialRequests: 'Anniversary celebration'
  }
])

const upcomingReservations = computed(() =>
  reservations.value.filter(r => r.status === 'Confirmed')
)

const pastReservations = computed(() =>
  reservations.value.filter(r => r.status === 'Completed')
)

// --- Helper Functions ---

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string, timeString: string) => {
  const date = new Date(`${dateString}T${timeString}`)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

// Updated to handle Backend UPPERCASE Enums
const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'DELIVERED': 'bg-emerald-100 text-emerald-700',
    'RECEIVED': 'bg-amber-100 text-amber-700',
    'PREPARING': 'bg-blue-100 text-blue-700',
    'ON_THE_WAY': 'bg-purple-100 text-purple-700',
    'CANCELLED': 'bg-rose-100 text-rose-700',
    // Reservation Statuses
    'Confirmed': 'bg-cyan-100 text-cyan-700',
    'Completed': 'bg-gray-100 text-gray-700'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-700'
}

const reorder = (orderId: string) => console.log('Reorder:', orderId)
const viewOrderDetails = (orderId: string) => console.log('View order details:', orderId)
const modifyReservation = (reservationId: string) => console.log('Modify reservation:', reservationId)
const cancelReservation = (reservationId: string) => console.log('Cancel reservation:', reservationId)
const viewReservationDetails = (reservationId: string) => console.log('View reservation details:', reservationId)

// Load orders on mount
onMounted(() => {
  fetchOrders();
})
</script>
