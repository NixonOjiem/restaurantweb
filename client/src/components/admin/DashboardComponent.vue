<template>
  <div class="relative min-h-screen bg-slate-50/50 p-4 md:p-8 overflow-hidden font-sans">
    <div class="fixed inset-0 -z-10 pointer-events-none">
      <div class="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px]"></div>
      <div class="absolute top-[40%] -left-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/30 blur-[100px]"></div>
    </div>

    <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
      <div class="space-y-1">
        <h1 class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
          Dashboard Analytics
        </h1>
        <p class="text-slate-500 font-medium flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          Overview for {{ formatMonth(selectedDate) }}
        </p>
      </div>

      <div class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-rose-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
        <input
          type="month"
          v-model="selectedDate"
          @change="fetchDashboardStats"
          class="relative bg-white/80 backdrop-blur-md border border-white text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-orange-500 outline-none block p-3 shadow-sm transition-all"
        >
      </div>
    </header>

    <div v-if="loading" class="flex flex-col justify-center h-[60vh] items-center space-y-4">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
      <p class="text-slate-400 font-medium animate-pulse">Curating your data...</p>
    </div>

    <div v-else class="grid grid-cols-12 gap-6 animate-slide-up">

      <div class="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div class="relative z-10">
            <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Revenue</p>
            <h3 class="text-5xl font-black text-white mt-4 tracking-tighter">
              {{ formatCurrency(stats.totals.revenue) }}
            </h3>
            <div class="mt-8 flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 w-fit px-3 py-1 rounded-full">
              Live Data
            </div>
          </div>
          <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-700"></div>
        </div>

        <div class="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-md transition-all">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Monthly Orders</p>
          <h3 class="text-3xl font-black text-slate-800 mt-2">{{ stats.totals.orders }}</h3>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div class="flex-1 bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-5">
          <div class="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div>
            <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total Users</p>
            <h3 class="text-2xl font-black text-slate-800">{{ stats.totals.users }}</h3>
          </div>
        </div>

        <div class="flex-1 bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-5">
          <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
             <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Active Dishes</p>
            <h3 class="text-2xl font-black text-slate-800">{{ stats.totals.menuItems }}</h3>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-7 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
        <h3 class="text-xl font-black text-slate-800 mb-8 tracking-tight">Daily Revenue Trend</h3>
        <div class="h-72">
          <Bar v-if="chartData.revenue" :data="chartData.revenue" :options="chartOptions" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-5 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
        <h3 class="text-xl font-black text-slate-800 mb-8 tracking-tight">Order Distribution</h3>
        <div class="h-72 flex justify-center">
          <Doughnut v-if="chartData.status" :data="chartData.status" :options="pieOptions" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-8 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
        <h3 class="text-xl font-black text-slate-800 mb-8">🔥 Top Performing Dishes</h3>
        <div class="overflow-x-auto px-1">
          <table class="w-full">
            <thead>
              <tr class="text-left border-b border-slate-100">
                <th class="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dish</th>
                <th class="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                <th class="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Revenue</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="item in stats.popularItems" :key="item._id" class="group transition-all">
                <td class="py-5">
                  <span class="font-bold text-slate-700 group-hover:text-orange-600 transition-colors">{{ item._id }}</span>
                </td>
                <td class="py-5 text-center">
                  <span class="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{{ item.count }}</span>
                </td>
                <td class="py-5 text-right font-black text-slate-900">{{ formatCurrency(item.revenue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
        <h3 class="text-xl font-black text-slate-800 mb-8 tracking-tight">Payment Health</h3>
        <div class="space-y-6">
          <div v-for="status in ['COMPLETED', 'PENDING', 'FAILED']" :key="status">
            <div class="flex justify-between mb-2">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">{{ status }}</span>
              <span class="text-xs font-black text-slate-900">{{ stats.paymentStatus[status] || 0 }}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :class="getPaymentColor(status)"
                :style="{ width: getPercentage(stats.paymentStatus[status] || 0) + '%' }"
              ></div>
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const useAuth = useAuthStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const loading = ref(false);
const selectedDate = ref(new Date().toISOString().slice(0, 7));

const stats = reactive<DashboardData>({
  totals: { users: 0, menuItems: 0, revenue: 0, orders: 0 },
  orderStatus: {},
  paymentStatus: {},
  popularItems: [],
  dailyRevenue: []
});

const chartData = reactive<{
  revenue: ChartData<'bar'> | null;
  status: ChartData<'doughnut'> | null;
}>({
  revenue: null,
  status: null
});

const fetchDashboardStats = async () => {
  loading.value = true;
  try {
    const token = useAuth.token;
    if (!token) return;

    const response = await fetch(`${baseUrl}/orders/dashboard-stats?date=${selectedDate.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const result: ApiResponse = await response.json();

    if (result.success) {
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

const updateCharts = () => {
  const dailyLabels = stats.dailyRevenue.map((d) => d._id.slice(8));
  const dailyValues = stats.dailyRevenue.map((d) => d.dailyTotal);

  chartData.revenue = {
    labels: dailyLabels,
    datasets: [{
      label: 'Revenue',
      backgroundColor: '#f97316',
      borderRadius: 8,
      data: dailyValues
    }]
  };

  const statusLabels = ["RECEIVED", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED"];
  const statusValues = statusLabels.map(label => stats.orderStatus[label] || 0);

  chartData.status = {
    labels: statusLabels,
    datasets: [{
      backgroundColor: ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'],
      hoverOffset: 15,
      borderWidth: 0,
      data: statusValues
    }]
  };
};

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { border: { display: false }, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false } }
  }
};

const pieOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } }
};

// --- Helpers ---
const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(val);

const formatMonth = (val: string) => {
  if (!val) return '';
  const [y, m] = val.split('-');
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

const getPercentage = (value: number) => {
  const total = Object.values(stats.paymentStatus).reduce((a, b) => a + (b as number), 0);
  return total > 0 ? (value / total) * 100 : 0;
};

const getPaymentColor = (status: string) => {
  const map: Record<string, string> = {
    COMPLETED: 'bg-emerald-500',
    PENDING: 'bg-amber-400',
    FAILED: 'bg-rose-500'
  };
  return map[status] || 'bg-slate-300';
};

onMounted(() => {
  fetchDashboardStats();
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
