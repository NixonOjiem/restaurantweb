<template>
  <div class="p-6 bg-slate-50 min-h-screen">

    <div class="flex flex-col md:flex-row justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p class="text-slate-500">Overview for {{ formatMonth(selectedDate) }}</p>
      </div>
      <div class="mt-4 md:mt-0">
        <input type="month" v-model="selectedDate" @change="fetchDashboardStats"
          class="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5">
      </div>
    </div>

    <div v-if="loading" class="flex justify-center h-64 items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <div v-else class="space-y-8 animate-fade-in">

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ formatCurrency(stats.totals.revenue) }}</h3>
          </div>
          <div class="p-3 bg-green-100 text-green-600 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Month Orders</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ stats.totals.orders }}</h3>
          </div>
          <div class="p-3 bg-blue-100 text-blue-600 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ stats.totals.users }}</h3>
          </div>
          <div class="p-3 bg-purple-100 text-purple-600 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Menu Items</p>
            <h3 class="text-2xl font-bold text-slate-800 mt-1">{{ stats.totals.menuItems }}</h3>
          </div>
          <div class="p-3 bg-orange-100 text-orange-600 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Daily Revenue Trend</h3>
          <div class="h-64 relative">
            <Bar v-if="chartData.revenue" :data="chartData.revenue" :options="chartOptions" />
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Order Status Distribution</h3>
          <div class="h-64 relative flex justify-center">
            <Doughnut v-if="chartData.status" :data="chartData.status" :options="pieOptions" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 class="text-lg font-bold text-slate-800 mb-4">🔥 Most Popular Dishes</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="pb-3 text-xs font-bold text-slate-400 uppercase">Dish Name</th>
                  <th class="pb-3 text-xs font-bold text-slate-400 uppercase text-right">Qty Sold</th>
                  <th class="pb-3 text-xs font-bold text-slate-400 uppercase text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="item in stats.popularItems" :key="item._id"
                  class="group hover:bg-slate-50 transition-colors">
                  <td class="py-4 font-medium text-slate-700">{{ item._id }}</td>
                  <td class="py-4 text-right text-slate-600">{{ item.count }}</td>
                  <td class="py-4 text-right font-bold text-orange-600">{{ formatCurrency(item.revenue) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="text-lg font-bold text-slate-800 mb-4">Payment Health</h3>
          <div class="space-y-4">
            <div v-for="status in ['COMPLETED', 'PENDING', 'FAILED']" :key="status"
              class="flex items-center justify-between p-3 rounded-lg border border-slate-50">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full" :class="getPaymentColor(status)"></div>
                <span class="font-medium text-slate-600 capitalize">{{ status.toLowerCase() }}</span>
              </div>
              <span class="font-bold text-slate-800">{{ stats.paymentStatus[status] || 0 }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { Bar, Doughnut } from 'vue-chartjs';
import type { DashboardData, ApiResponse } from '@/types';
// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const useAuth = useAuthStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const loading = ref(false);
const selectedDate = ref(new Date().toISOString().slice(0, 7)); // YYYY-MM

// Initialize stats with specific DashboardData type
const stats = reactive<DashboardData>({
  totals: { users: 0, menuItems: 0, revenue: 0, orders: 0 },
  orderStatus: {},
  paymentStatus: {},
  popularItems: [],
  dailyRevenue: []
});

// Initialize chart data with ChartJS types
const chartData = reactive<{
  revenue: ChartData<'bar'> | null;
  status: ChartData<'doughnut'> | null;
}>({
  revenue: null,
  status: null
});

// --- 3. API Fetch ---

const fetchDashboardStats = async () => {
  loading.value = true;
  try {
    const token = useAuth.token;
    if (!token) return;

    const response = await fetch(`${baseUrl}/orders/dashboard-stats?date=${selectedDate.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Cast the response to our typed interface
    const result: ApiResponse = await response.json();

    if (result.success) {
      // Update state safely
      stats.totals = result.data.totals;
      stats.orderStatus = result.data.orderStatus;
      stats.paymentStatus = result.data.paymentStatus;
      stats.popularItems = result.data.popularItems;
      stats.dailyRevenue = result.data.dailyRevenue;

      updateCharts();
    }
  } catch (error) {
    console.error("Failed to load dashboard stats", error);
  } finally {
    loading.value = false;
  }
};

// --- 4. Chart Configuration ---

const updateCharts = () => {
  // 1. Bar Chart (Daily Revenue)
  // Ensure we handle empty data safely
  const dailyLabels = stats.dailyRevenue.map((d) => d._id.slice(8)); // "05" from "2023-12-05"
  const dailyValues = stats.dailyRevenue.map((d) => d.dailyTotal);

  chartData.revenue = {
    labels: dailyLabels,
    datasets: [{
      label: 'Daily Revenue',
      backgroundColor: '#f97316',
      borderRadius: 6,
      data: dailyValues
    }]
  };

  // 2. Doughnut Chart (Order Status)
  const statusLabels = ["RECEIVED", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED"];
  // Use typed Record lookup
  const statusValues = statusLabels.map(label => stats.orderStatus[label] || 0);

  chartData.status = {
    labels: statusLabels,
    datasets: [{
      backgroundColor: ['#fcd34d', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444'],
      data: statusValues
    }]
  };
};

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } }
};

const pieOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } }
};

// --- 5. Helpers ---

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(val);

const formatMonth = (val: string) => {
  if (!val) return '';

  const [y, m] = val.split('-');

  // Safety check: ensure both year and month exist before parsing
  if (!y || !m) return val;

  const date = new Date(parseInt(y), parseInt(m) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const getPaymentColor = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: 'bg-green-500',
    PENDING: 'bg-yellow-500',
    FAILED: 'bg-red-500'
  };
  return map[status] || 'bg-gray-300';
};

onMounted(() => {
  fetchDashboardStats();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
