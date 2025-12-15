<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Order Management</h1>
        <button @click="loadOrders"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center gap-2"
          :disabled="loading">
          <span v-if="loading">Refreshing...</span>
          <span v-else>Refresh Orders</span>
        </button>
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
      </div>

      <div v-if="loading && orders.length === 0" class="space-y-4">
        <div v-for="n in 3" :key="n" class="h-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div v-else-if="!loading && orders.length === 0" class="text-center py-12 bg-white rounded shadow">
        <p class="text-gray-500 text-lg">No orders found.</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                  {{ order._id.slice(-6).toUpperCase() }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-900">{{ order.user?.name || 'Unknown' }}</span>
                    <span class="text-xs text-gray-500">{{ order.user?.phoneNumber }}</span>
                  </div>
                </td>

                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    <ul class="list-disc list-inside">
                      <li v-for="item in order.items" :key="item._id">
                        {{ item.quantity }}x {{ item.name }}
                      </li>
                    </ul>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Ksh {{ order.totalAmount.toLocaleString() }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    order.paymentInfo.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      order.paymentInfo.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ order.paymentInfo.status }}
                  </span>
                  <div class="text-xs text-gray-500 mt-1">{{ order.paymentInfo.method }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <select :value="order.orderStatus" @change="updateStatus(order._id, $event.target.value)"
                    :disabled="updating === order._id"
                    class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    :class="{
                      'bg-gray-100': updating === order._id,
                      'text-blue-600 font-bold': order.orderStatus === 'RECEIVED',
                      'text-orange-600 font-bold': order.orderStatus === 'PREPARING',
                      'text-purple-600 font-bold': order.orderStatus === 'ON_THE_WAY',
                      'text-green-600 font-bold': order.orderStatus === 'DELIVERED',
                      'text-red-600 font-bold': order.orderStatus === 'CANCELLED',
                    }">
                    <option value="RECEIVED">Received</option>
                    <option value="PREPARING">Preparing</option>
                    <option value="ON_THE_WAY">On The Way</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <div v-if="updating === order._id" class="text-xs text-indigo-500 mt-1">Updating...</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

// --- State ---
const orders = ref<any[]>([]);
const loading = ref(false);
const error = ref('');
const updating = ref<string | null>(null);

// --- Config ---
const authStore = useAuthStore();
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Correct endpoint based on your routes:
// Router mounted at /orders, and route is /admin-orders
const adminOrdersUrl = `${apiUrl}/orders/admin-orders`;

// --- Methods ---

const loadOrders = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await axios.get(adminOrdersUrl, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    });

    if (response.data.success) {
      orders.value = response.data.orders;
    }
  } catch (err: any) {
    console.error('Failed to load orders:', err);
    error.value = err.response?.data?.message || 'Failed to fetch orders. Ensure you are an Admin.';
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (orderId: string, newStatus: string) => {
  // Optimistic update (optional) or just wait for server
  updating.value = orderId;

  try {
    const url = `${adminOrdersUrl}/${orderId}/status`;
    const response = await axios.put(url,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${authStore.token}` }
      }
    );

    if (response.data.success) {
      // Update local state to reflect change without full reload
      const index = orders.value.findIndex(o => o._id === orderId);
      if (index !== -1) {
        orders.value[index].orderStatus = newStatus;
      }
      // Optional: Show success toast here
    }
  } catch (err: any) {
    console.error('Update failed:', err);
    alert(err.response?.data?.message || 'Failed to update status');
    // Revert logic could go here if using optimistic updates
    loadOrders(); // Refresh to ensure data consistency
  } finally {
    updating.value = null;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// --- Lifecycle ---
onMounted(() => {
  loadOrders();
});
</script>

<style scoped>
/* Scoped styles if needed, mostly using Tailwind classes */
</style>
