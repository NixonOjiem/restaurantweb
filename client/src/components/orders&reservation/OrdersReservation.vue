<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 to-orange-50 p-4 md:p-8 font-sans text-slate-700">
    <MenuHeroSection />
    <div class=" text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Dining History</h1>
      <p class="text-slate-500 text-lg">View your orders and reservations</p>
    </div>

    <div class="max-w-6xl mx-auto">

      <div class="flex flex-col sm:flex-row gap-4 mb-8 p-2 bg-white rounded-2xl shadow-sm border border-stone-100">
        <button v-for="tab in ['orders', 'reservations']" :key="tab" @click="activeTab = tab as any"
          class="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          :class="activeTab === tab
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 transform scale-[1.02]'
            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'">
          <span class="text-xl">{{ tab === 'orders' ? '🍽️' : '📅' }}</span>
          <span class="capitalize">{{ tab === 'orders' ? 'My Orders' : 'Reservations' }}</span>
          <span class="ml-2 text-xs py-0.5 px-2 rounded-full"
            :class="activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'">
            {{ tab === 'orders' ? orders.length : upcomingReservations.length }}
          </span>
        </button>
      </div>

      <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0">
        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="flex items-center gap-4 pb-2 border-b-2 border-orange-100">
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
                  <div class="font-bold text-slate-800">#{{ order.id.split('-')[1] }}</div>
                  <div class="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{{
                    formatDate(order.date) }}</div>
                </div>
                <span
                  :class="['px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider', getStatusClass(order.status)]">
                  {{ order.status }}
                </span>
              </div>

              <div class="p-5">
                <div class="space-y-3 mb-6">
                  <div v-for="item in order.items" :key="item.id" class="flex justify-between items-center text-sm">
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
                    <button v-if="order.status === 'Delivered'" @click="reorder(order.id)"
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

          <div v-if="orders.length === 0"
            class="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
            <div class="text-6xl mb-4 opacity-50">🍽️</div>
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
            <div class="flex items-center gap-4 mb-6 pb-2 border-b-2 border-orange-100">
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
                      📅 {{ formatDateTime(reservation.date, reservation.time) }}
                    </span>
                  </div>
                  <div>
                    <span class="text-xs text-slate-500 block mb-1">Guests</span>
                    <span class="font-semibold text-slate-800 flex items-center gap-1">
                      👥 {{ reservation.guests }} People
                    </span>
                  </div>
                  <div>
                    <span class="text-xs text-slate-500 block mb-1">Table</span>
                    <span class="font-semibold text-slate-800">{{ reservation.tableNumber }}</span>
                  </div>
                  <div v-if="reservation.specialRequests">
                    <span class="text-xs text-slate-500 block mb-1">Request</span>
                    <span class="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block">
                      {{ reservation.specialRequests }}
                    </span>
                  </div>
                </div>

                <div class="flex gap-3 pt-4 border-t border-slate-100">
                  <button @click="modifyReservation(reservation.id)"
                    class="flex-1 py-2 text-sm font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                    Modify
                  </button>
                  <button @click="cancelReservation(reservation.id)"
                    class="flex-1 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div v-if="upcomingReservations.length === 0"
              class="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
              <p class="text-slate-500">No upcoming reservations.</p>
              <button
                class="mt-4 px-5 py-2 text-orange-500 font-semibold hover:bg-orange-50 rounded-lg transition-colors">
                Make a Reservation
              </button>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-bold text-slate-700 mb-4 opacity-75">Past Visits</h3>
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100">
              <div v-for="reservation in pastReservations" :key="reservation.id"
                class="p-4 flex flex-col sm:flex-row justify-between items-center hover:bg-slate-50 transition-colors gap-4">
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto text-center sm:text-left">
                  <span class="font-bold text-slate-800">{{ formatDate(reservation.date) }}</span>
                  <div class="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <span>{{ reservation.guests }} guests</span>
                    <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{{ reservation.time }}</span>
                  </div>
                </div>
                <button @click="viewReservationDetails(reservation.id)"
                  class="text-sm font-semibold text-blue-500 hover:text-blue-700 hover:underline">
                  View Details
                </button>
              </div>
            </div>
            <div v-if="pastReservations.length === 0" class="text-center py-8 text-slate-400 italic">
              No past history found.
            </div>
          </div>

        </div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MenuHeroSection from '../menupage/MenuHeroSection.vue'

// Active tab state
const activeTab = ref<'orders' | 'reservations'>('orders')

// Dummy data for orders
const orders = ref([
  {
    id: 'ORD-78945',
    date: '2024-01-15',
    items: [
      { id: 1, name: 'Truffle Pasta', quantity: 1, price: 24.99 },
      { id: 2, name: 'Garlic Bread', quantity: 2, price: 4.99 },
      { id: 3, name: 'House Red Wine', quantity: 1, price: 18.99 }
    ],
    total: 53.96,
    status: 'Delivered',
    isFeatured: true
  },
  {
    id: 'ORD-78944',
    date: '2024-01-10',
    items: [
      { id: 1, name: 'Grilled Salmon', quantity: 1, price: 28.99 },
      { id: 2, name: 'Caesar Salad', quantity: 1, price: 12.99 }
    ],
    total: 41.98,
    status: 'Delivered',
    isFeatured: false
  },
  {
    id: 'ORD-78943',
    date: '2024-01-05',
    items: [
      { id: 1, name: 'Ribeye Steak', quantity: 1, price: 34.99 },
      { id: 2, name: 'Mashed Potatoes', quantity: 1, price: 6.99 },
      { id: 3, name: 'Chocolate Lava Cake', quantity: 1, price: 9.99 }
    ],
    total: 51.97,
    status: 'Cancelled',
    isFeatured: false
  }
])

// Dummy data for reservations
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
  },
  {
    id: 'RES-12343',
    date: '2024-01-05',
    time: '18:00',
    guests: 6,
    tableNumber: 'Private Room 3',
    status: 'Completed',
    specialRequests: ''
  },
  {
    id: 'RES-12342',
    date: '2023-12-28',
    time: '19:00',
    guests: 2,
    tableNumber: 'Table 5',
    status: 'Completed',
    specialRequests: 'Vegetarian options needed'
  }
])

// Computed properties
const upcomingReservations = computed(() =>
  reservations.value.filter(r => r.status === 'Confirmed')
)

const pastReservations = computed(() =>
  reservations.value.filter(r => r.status === 'Completed')
)

// Helper functions
const formatDate = (dateString: string) => {
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

// Updated to return Tailwind Classes
const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'Delivered': 'bg-emerald-100 text-emerald-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'Cancelled': 'bg-rose-100 text-rose-700',
    'Preparing': 'bg-blue-100 text-blue-700',
    'Confirmed': 'bg-cyan-100 text-cyan-700'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-700'
}

// Action functions
const reorder = (orderId: string) => console.log('Reorder:', orderId)
const viewOrderDetails = (orderId: string) => console.log('View order details:', orderId)
const modifyReservation = (reservationId: string) => console.log('Modify reservation:', reservationId)
const cancelReservation = (reservationId: string) => {
  if (confirm('Are you sure you want to cancel this reservation?')) {
    console.log('Cancel reservation:', reservationId)
  }
}
const viewReservationDetails = (reservationId: string) => console.log('View reservation details:', reservationId)
</script>
