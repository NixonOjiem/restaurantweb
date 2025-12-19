<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30 p-4 md:p-8 font-sans selection:bg-orange-200/50 overflow-x-hidden">

    <Transition name="toast">
      <div v-if="toast.show" :class="toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'"
           class="fixed top-6 right-6 z-[100] px-6 py-3 rounded-2xl shadow-2xl text-white flex items-center gap-3 font-bold">
        <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
        {{ toast.message }}
      </div>
    </Transition>

    <div class="w-full max-w-7xl mx-auto relative z-10">
      <header class="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="space-y-1">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl rotate-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <div>
              <h1 class="text-4xl font-black text-slate-900 tracking-tight">Staff <span class="text-orange-600">Portal</span></h1>
              <p class="text-slate-500 font-medium">Manage team permissions and restaurant access</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
            <button @click="fetchUsers(pagination.page)" class="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm">
                <svg class="w-5 h-5" :class="{'animate-spin': isLoading}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <div class="h-10 w-px bg-slate-200 mx-2"></div>
            <div class="bg-white px-5 py-2.5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-4">
                <div class="text-right">
                    <p class="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                    <p class="text-sm font-black text-emerald-600">Live Sync</p>
                </div>
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
        </div>
      </header>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <aside class="xl:col-span-3 space-y-6">
          <div class="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Role Distribution</h3>

            <div class="h-48 relative mb-8">
              <Doughnut v-if="chartData.roleDist" :data="chartData.roleDist" :options="chartOptions" />
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-3xl font-black text-slate-800">{{ pagination.totalUsers }}</span>
                <span class="text-[10px] font-bold text-slate-400 uppercase">Total</span>
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="(count, role) in roleCounts" :key="role" class="group">
                <div class="flex justify-between items-center mb-1.5">
                  <span class="text-xs font-bold text-slate-500 uppercase">{{ role === 'admin' ? 'Managers' : 'Staff' }}</span>
                  <span class="text-xs font-black text-slate-800">{{ count }}</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000"
                       :class="role === 'admin' ? 'bg-purple-500' : 'bg-emerald-500'"
                       :style="{ width: `${(count / (pagination.totalUsers || 1)) * 100}%` }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-2xl">
            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Management Ratio</p>
            <div class="flex items-end gap-2">
                <span class="text-4xl font-black">{{ Math.round((roleCounts.admin / (pagination.totalUsers || 1)) * 100) }}%</span>
                <span class="text-slate-400 text-sm mb-1">of team</span>
            </div>
            <p class="mt-4 text-xs text-slate-400 leading-relaxed">A healthy ratio is between 15-20% for restaurant environments.</p>
          </div>
        </aside>

        <main class="xl:col-span-9">
          <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-full">

            <div class="px-8 py-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
              <div class="relative w-full sm:w-96 group">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name or email..."
                  class="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                >
              </div>
              <div class="flex items-center gap-4">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ filteredUsers.length }} showing</span>
              </div>
            </div>

            <div class="hidden xl:grid grid-cols-12 bg-white px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <div class="col-span-1">Ref</div>
              <div class="col-span-5">Identity</div>
              <div class="col-span-4 text-center">Permissions</div>
              <div class="col-span-2 text-right">Actions</div>
            </div>

            <div v-if="isLoading" class="divide-y divide-slate-50">
              <div v-for="i in 5" :key="i" class="px-8 py-6 grid grid-cols-12 animate-pulse">
                <div class="col-span-1"><div class="w-6 h-6 bg-slate-100 rounded"></div></div>
                <div class="col-span-5 flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-100 rounded-2xl"></div>
                    <div class="space-y-2">
                        <div class="w-32 h-4 bg-slate-100 rounded"></div>
                        <div class="w-24 h-3 bg-slate-100 rounded"></div>
                    </div>
                </div>
                <div class="col-span-4 flex justify-center"><div class="w-24 h-8 bg-slate-100 rounded-xl"></div></div>
                <div class="col-span-2 flex justify-end gap-2"><div class="w-8 h-8 bg-slate-100 rounded-lg"></div></div>
              </div>
            </div>

            <div v-else class="flex-grow overflow-y-auto">
              <TransitionGroup name="list" tag="div" class="divide-y divide-slate-50">
                <div
                  v-for="(user, index) in filteredUsers"
                  :key="user._id"
                  class="role-selector-container px-6 py-4 xl:px-8 hover:bg-orange-50/30 transition-all duration-300 group relative"
                  :class="user._id === currentUserId ? 'bg-orange-50/20' : ''"
                >
                  <div class="grid grid-cols-1 xl:grid-cols-12 items-center gap-4">
                    <div class="hidden xl:block col-span-1 text-xs font-bold text-slate-300">
                      #{{ (pagination.page - 1) * pagination.limit + index + 1 }}
                    </div>

                    <div class="col-span-1 xl:col-span-5 flex items-center gap-4">
                      <div class="relative">
                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                          <span class="text-lg font-black text-slate-500">{{ user.userName.charAt(0) }}</span>
                        </div>
                        <div v-if="user.role === 'admin'" class="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-600 rounded-full border-2 border-white flex items-center justify-center">
                          <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </div>
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <h4 class="text-sm font-black text-slate-800 truncate">{{ user.userName }}</h4>
                          <span v-if="user._id === currentUserId" class="px-2 py-0.5 rounded-md bg-slate-900 text-[8px] text-white font-black uppercase">Self</span>
                        </div>
                        <p class="text-xs text-slate-400 truncate">{{ user.email }}</p>
                      </div>
                    </div>

                    <div class="col-span-1 xl:col-span-4 flex xl:justify-center">
                      <div class="relative w-full sm:w-auto">
                        <button
                          @click.stop="toggleDropdown(user._id)"
                          :disabled="user._id === currentUserId"
                          class="w-full sm:w-44 flex items-center justify-between px-4 py-2 rounded-xl border transition-all disabled:opacity-50"
                          :class="user.role === 'admin' ? 'bg-purple-50 border-purple-100 text-purple-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'"
                        >
                          <span class="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full" :class="user.role === 'admin' ? 'bg-purple-500' : 'bg-emerald-500'"></span>
                            {{ user.role === 'admin' ? 'Manager' : 'Staff' }}
                          </span>
                          <svg v-if="user._id !== currentUserId" class="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>

                        <Transition name="pop">
                          <div v-if="activeDropdown === user._id" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
                            <button @click="updateRoleAction(user, 'user')" class="w-full p-4 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                                <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg></div>
                                <div class="text-left"><p class="text-xs font-black text-slate-800">Staff</p><p class="text-[10px] text-slate-400">Limited Access</p></div>
                            </button>
                            <button @click="updateRoleAction(user, 'admin')" class="w-full p-4 hover:bg-slate-50 flex items-center gap-3 transition-colors border-t border-slate-50">
                                <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div>
                                <div class="text-left"><p class="text-xs font-black text-slate-800">Manager</p><p class="text-[10px] text-slate-400">Full Access</p></div>
                            </button>
                          </div>
                        </Transition>
                      </div>
                    </div>

                    <div class="col-span-1 xl:col-span-2 flex justify-end gap-2">
                      <button v-if="user._id !== currentUserId" @click="confirmDelete(user)" class="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                      <button class="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </TransitionGroup>

              <div v-if="filteredUsers.length === 0 && !isLoading" class="py-20 text-center">
                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <h3 class="text-slate-800 font-black">No team members found</h3>
                <p class="text-slate-400 text-sm">Try adjusting your search query</p>
              </div>
            </div>

            <div class="px-8 py-5 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
              <div class="flex gap-2">
                <button
                  @click="changePage(pagination.page - 1)"
                  :disabled="pagination.page <= 1"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:border-orange-200 hover:text-orange-600 transition-all text-xs font-bold"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Previous
                </button>
                <button
                  @click="changePage(pagination.page + 1)"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:border-orange-200 hover:text-orange-600 transition-all text-xs font-bold"
                >
                  Next
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, type ChartData, type ChartOptions } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

// --- State & Props ---
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const useAuth = useAuthStore();
const currentUserId = computed(() => useAuth.user?.id);

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
}

const users = ref<User[]>([]);
const searchQuery = ref('');
const isLoading = ref(false);
const activeDropdown = ref<string | null>(null);
const pagination = reactive({ page: 1, limit: 10, totalPages: 1, totalUsers: 0 });
const toast = reactive({ show: false, message: '', type: 'success' });

// --- Computed ---
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(u =>
    u.userName.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query)
  );
});

const roleCounts = computed(() => {
  return users.value.reduce((acc, user) => {
    acc[user.role === 'admin' ? 'admin' : 'user']++;
    return acc;
  }, { admin: 0, user: 0 });
});

// --- Actions & Methods ---
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toast.message = message;
    toast.type = type;
    toast.show = true;
    setTimeout(() => toast.show = false, 3000);
};

const fetchUsers = async (page = 1) => {
  isLoading.value = true;
  try {
    const response = await fetch(`${baseUrl}/profile/admin-all?page=${page}&limit=${pagination.limit}`, {
      headers: { 'Authorization': `Bearer ${useAuth.token}` }
    });
    const data = await response.json();
    if (response.ok) {
      users.value = data.data;
      pagination.page = data.pagination.page;
      pagination.totalPages = data.pagination.totalPages;
      pagination.totalUsers = data.pagination.totalUsers;
      updateChart();
    }
  } catch (err) {
      showToast('Failed to fetch team data', 'error');
  } finally {
    setTimeout(() => isLoading.value = false, 500); // Visual breathing room
  }
};

const updateRoleAction = async (user: User, newRole: string) => {
  activeDropdown.value = null;
  const oldRole = user.role;
  user.role = newRole;

  try {
    const response = await fetch(`${baseUrl}/profile/admin-role/${user._id}`, {
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${useAuth.token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole })
    });
    if (response.ok) {
        showToast(`Updated ${user.userName} to ${newRole}`);
        updateChart();
    } else throw new Error();
  } catch {
    user.role = oldRole;
    showToast('Failed to update role', 'error');
  }
};

const confirmDelete = async (user: User) => {
  if (!confirm(`Remove ${user.userName} from the team?`)) return;
  try {
    const response = await fetch(`${baseUrl}/profile/admin-delete/${user._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${useAuth.token}` }
    });
    if (response.ok) {
        showToast('Staff member removed');
        fetchUsers(pagination.page);
    }
  } catch (err) {
      showToast('Error deleting user', 'error');
  }
};

const toggleDropdown = (id: string) => activeDropdown.value = activeDropdown.value === id ? null : id;
const closeDropdown = (e: MouseEvent) => {
  if (!(e.target as Element).closest('.role-selector-container')) activeDropdown.value = null;
};

const changePage = (p: number) => { if (p > 0 && p <= pagination.totalPages) fetchUsers(p); };

// --- Chart ---
const chartData = reactive<{ roleDist: ChartData<'doughnut'> | null }>({ roleDist: null });
const updateChart = () => {
  chartData.roleDist = {
    labels: ['Managers', 'Staff'],
    datasets: [{
      data: [roleCounts.value.admin, roleCounts.value.user],
      backgroundColor: ['#9333ea', '#10b981'],
      hoverBackgroundColor: ['#7e22ce', '#059669'],
      borderWidth: 0,
      cutout: '80%',
      borderRadius: 20,
      spacing: 5
    }]
  };
};

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: true } }
};

// --- Lifecycle ---
onMounted(() => {
  fetchUsers();
  window.addEventListener('click', closeDropdown);
});
onUnmounted(() => window.removeEventListener('click', closeDropdown));
</script>

<style scoped>
/* List Transitions */
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Pop Animation */
.pop-enter-active { animation: popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.pop-leave-active { animation: popIn 0.2s reverse ease-in; }

@keyframes popIn {
  from { opacity: 0; transform: translateY(-10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Toast Animation */
.toast-enter-active { animation: slideInRight 0.4s ease; }
.toast-leave-active { animation: slideInRight 0.4s reverse ease; }

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
</style>
