<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Admin Orders Dashboard</h1>
        <button @click="loadOrders"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center gap-2"
          :disabled="loading">
          <span v-if="loading">Refreshing...</span>
          <span v-else>Refresh Data</span>
        </button>
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expand</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Ref</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="order in orders" :key="order._id">
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="toggleExpand(order._id)"
                    class="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                    <span v-if="expandedRows.has(order._id)">▼ Hide</span>
                    <span v-else>▶ Show</span>
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                  {{ order._id.slice(-6).toUpperCase() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">{{ order.user?.email }}</span>
                    <span class="text-xs text-gray-500">ID: {{ order.user?._id?.slice(-4) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Ksh {{ order.totalAmount?.toLocaleString() }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <select :value="order.orderStatus" @change="updateStatus(order._id, $event.target.value)"
                    class="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-1"
                    :class="{
                      'text-green-600 font-bold': order.orderStatus === 'DELIVERED',
                      'text-orange-600 font-bold': order.orderStatus === 'PREPARING',
                      'text-blue-600 font-bold': order.orderStatus === 'RECEIVED',
                    }">
                    <option value="RECEIVED">Received</option>
                    <option value="PREPARING">Preparing</option>
                    <option value="ON_THE_WAY">On The Way</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>
              </tr>

              <tr v-if="expandedRows.has(order._id)" class="bg-gray-50">
                <td colspan="6" class="px-6 py-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div class="bg-white p-4 rounded border border-gray-200">
                      <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">Delivery Address</h3>
                      <p class="text-sm"><strong>Building:</strong> {{ order.deliveryAddress?.building || 'N/A' }}</p>
                      <p class="text-sm"><strong>Door:</strong> {{ order.deliveryAddress?.doorNumber || 'N/A' }}</p>
                      <p class="text-sm mt-2 text-gray-600 italic">"{{ order.deliveryAddress?.instructions }}"</p>
                      <div class="mt-2 text-xs text-blue-600">
                        Lat: {{ order.deliveryAddress?.location?.lat }}, Lng: {{ order.deliveryAddress?.location?.lng }}
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded border border-gray-200">
                      <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">Payment Details</h3>
                      <p class="text-sm"><strong>Method:</strong> {{ order.paymentInfo?.method }}</p>
                      <p class="text-sm"><strong>M-Pesa No:</strong> {{ order.paymentInfo?.mpesaNumber }}</p>
                      <p class="text-sm"><strong>Contact No:</strong> {{ order.paymentInfo?.contactNumber }}</p>
                      <div class="mt-2">
                        <span :class="[
                          'px-2 py-1 text-xs font-semibold rounded',
                          order.paymentInfo?.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            order.paymentInfo?.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                        ]">
                          {{ order.paymentInfo?.status }}
                        </span>
                      </div>
                    </div>

                    <div class="bg-white p-4 rounded border border-gray-200">
                      <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">Items Ordered ({{ order.items?.length
                      }})</h3>
                      <ul class="divide-y divide-gray-100">
                        <li v-for="item in order.items" :key="item._id" class="py-2 flex items-center gap-3">

                          <img v-if="item.image" :src="getOptimizedImageUrl(item.image)" alt="Product"
                            class="w-10 h-10 object-cover rounded bg-gray-100" />

                          <div
                            class="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
                            v-else>
                            No Img
                          </div>

                          <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900">{{ item.name || 'Unnamed Item' }}</p>
                            <p class="text-xs text-gray-500">Qty: {{ item.quantity }} x Ksh {{ item.price }}</p>
                          </div>
                          <div class="text-sm font-bold text-gray-700">
                            {{ (item.quantity * item.price).toLocaleString() }}
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

// --- Types ---
interface Order {
  _id: string;
  user: { _id: string; email: string };
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: any[];
  deliveryAddress: any;
  paymentInfo: any;
}

// --- State ---
const orders = ref<Order[]>([]);
const loading = ref(false);
const error = ref('');
const expandedRows = ref(new Set<string>());

// --- Config ---
const authStore = useAuthStore();
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// ImageKit Config (Must match your Menu component)
const IMAGEKIT_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_FOLDER = 'menu-pic'; // Set this if your images are in a subfolder

// --- Helper: Transform Local Path to ImageKit URL ---
const getOptimizedImageUrl = (dbPath: string | undefined) => {
  if (!dbPath) return '';

  // 1. If it's already a full URL, use it
  if (dbPath.startsWith('http')) return dbPath;

  // 2. Extract filename (removes '/menu-pic/')
  const filename = dbPath.split('/').pop();

  // 3. Construct ImageKit URL
  return `${IMAGEKIT_ENDPOINT}/${IMAGEKIT_FOLDER ? IMAGEKIT_FOLDER + '/' : ''}${filename}`;
};

// --- Methods ---

const loadOrders = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get(`${apiUrl}/orders/admin-orders`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    if (response.data.success) {
      orders.value = response.data.orders;
    }
  } catch (err: any) {
    console.error('Fetch error:', err);
    error.value = 'Failed to load orders.';
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (orderId: string, newStatus: string) => {
  try {
    const response = await axios.put(
      `${apiUrl}/orders/admin-orders/${orderId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );

    if (response.data.success) {
      const order = orders.value.find(o => o._id === orderId);
      if (order) order.orderStatus = newStatus;
    }
  } catch (err: any) {
    alert('Failed to update status');
    loadOrders();
  }
};

const toggleExpand = (id: string) => {
  if (expandedRows.value.has(id)) {
    expandedRows.value.delete(id);
  } else {
    expandedRows.value.add(id);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

onMounted(() => {
  loadOrders();
});
</script>
