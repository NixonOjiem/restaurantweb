<template>
  <div class="w-full min-h-screen bg-linear-to-br from-slate-50 to-orange-50/30 p-4 md:p-8 font-sans selection:bg-orange-200/50 overflow-x-hidden">

    <Transition name="modal-outer">
      <div v-if="deleteModal.show" class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <Transition name="modal-inner" appear>
          <div v-if="deleteModal.show" class="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl border border-white/20">
            <div class="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-8 mx-auto rotate-3">
              <svg class="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 text-center mb-3">Remove User?</h3>
            <p class="text-slate-600 text-center mb-10 leading-relaxed font-medium px-4">
              You are removing <span class="font-bold text-slate-900">{{ deleteModal.user?.userName }}</span>.
              This user will lose all access to the <span class="text-orange-600 italic">Cuisine Élégante</span> ecosystem.
            </p>
            <div class="flex flex-col gap-3">
              <button @click="executeDelete" class="w-full py-4 rounded-2xl bg-rose-600 text-white font-black hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">Confirm Deletion</button>
              <button @click="closeDeleteModal" class="w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all">Cancel</button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <Transition name="toast">
      <div v-if="toast.show" class="fixed top-6 right-6 z-110 bg-slate-900 px-6 py-4 rounded-2xl shadow-2xl text-white flex items-center gap-4 border border-white/10">
        <div class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
        <span class="text-sm font-bold tracking-tight uppercase italic">{{ toast.message }}</span>
      </div>
    </Transition>

    <div class="w-full max-w-7xl mx-auto relative z-10">
      <header class="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div class="space-y-2">
          <div class="flex items-center gap-5">
            <div class="w-14 h-14 rounded-3xl bg-slate-900 flex items-center justify-center shadow-2xl rotate-3">
              <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <div>
              <h1 class="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">User <span class="text-orange-600">Access</span></h1>
              <p class="text-slate-500 font-medium tracking-tight">Security Permissions & Role Governance</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
            <button @click="fetchUsers(pagination.page)" class="w-14 h-14 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition-all flex items-center justify-center shadow-sm">
                <svg class="w-6 h-6" :class="{'animate-spin': isLoading}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <div class="bg-white px-6 py-3 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-5">
                <div class="text-right">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network</p>
                    <p class="text-sm font-black text-emerald-600">Syncing Live</p>
                </div>
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
        </div>
      </header>

      <div class="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <aside class="xl:col-span-3 space-y-8">
          <div class="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100/50">
            <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 text-center">User Analytics</h3>

            <div class="h-44 relative mb-10">
              <Doughnut v-if="chartData.roleDist" :data="chartData.roleDist" :options="chartOptions" />
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-4xl font-black text-slate-900 tracking-tighter">{{ pagination.totalUsers }}</span>
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Users</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                <span class="text-[10px] font-black text-slate-500 uppercase">Managers</span>
                <span class="text-xs font-black text-purple-700">{{ roleCounts.admin }}</span>
              </div>
              <div class="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
                <span class="text-[10px] font-black text-slate-500 uppercase">Users</span>
                <span class="text-xs font-black text-emerald-700">{{ roleCounts.user }}</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-700"></div>
            <p class="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">Management Load</p>
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-5xl font-black text-orange-500 tracking-tighter">
                {{ Math.round((roleCounts.admin / (pagination.totalUsers || 1)) * 100) }}%
              </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed font-medium">Of your infrastructure is managed by administrators.</p>
          </div>
        </aside>

        <main class="xl:col-span-9">
          <div class="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col relative">

            <div class="px-10 py-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
              <div class="relative w-full sm:w-96 group">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Filter users..."
                  class="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm focus:ring-4 focus:ring-orange-500/5 focus:border-orange-300 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm"
                >
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
              </div>
              <span class="hidden sm:block text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ filteredUsers.length }} Active</span>
            </div>

            <div class="relative overflow-visible pb-16">
              <div class="hidden xl:grid grid-cols-12 bg-white px-12 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <div class="col-span-1">Ref</div>
                <div class="col-span-5">Identity Profile</div>
                <div class="col-span-4 text-center">Authorization</div>
                <div class="col-span-2 text-right">Settings</div>
              </div>

              <div v-if="isLoading" class="p-20 flex flex-col items-center gap-4 opacity-50">
                <div class="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Updating View...</span>
              </div>

              <div v-else class="min-h-[450px]">
                <TransitionGroup name="list" tag="div" class="divide-y divide-slate-50">
                  <div
                    v-for="(user, index) in filteredUsers"
                    :key="user._id"
                    class="role-selector-container px-8 py-5 xl:px-12 hover:bg-slate-50/50 transition-all duration-300 group relative"
                    :class="[user._id === currentUserId ? 'bg-orange-50/30' : '', activeDropdown === user._id ? 'z-60' : 'z-10']"
                  >
                    <div class="grid grid-cols-1 xl:grid-cols-12 items-center gap-6">
                      <div class="hidden xl:block col-span-1 text-xs font-bold text-slate-400">
                        #{{ (pagination.page - 1) * pagination.limit + index + 1 }}
                      </div>

                      <div class="col-span-1 xl:col-span-5 flex items-center gap-5">
                        <div class="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl font-black text-slate-500 shadow-inner group-hover:bg-white group-hover:shadow-lg transition-all duration-500 overflow-hidden">
                          {{ user.userName.charAt(0) }}
                        </div>
                        <div class="min-w-0">
                          <h4 class="text-sm font-black text-slate-900 flex items-center gap-2">
                            {{ user.userName }}
                            <span v-if="user._id === currentUserId" class="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
                          </h4>
                          <p class="text-xs text-slate-500 font-medium truncate tracking-tight">{{ user.email }}</p>
                        </div>
                      </div>

                      <div class="col-span-1 xl:col-span-4 flex xl:justify-center">
                        <div class="relative w-full sm:w-auto">
                          <button
                            @click.stop="toggleDropdown(user._id)"
                            :disabled="user._id === currentUserId"
                            class="w-full sm:w-48 flex items-center justify-between px-6 py-3 rounded-2xl border-2 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                            :class="user.role === 'admin' ? 'bg-purple-50 border-purple-100 text-purple-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'"
                          >
                            <span class="flex items-center gap-3">
                              <span class="w-2 h-2 rounded-full" :class="user.role === 'admin' ? 'bg-purple-500' : 'bg-emerald-500'"></span>
                              {{ user.role === 'admin' ? 'Manager' : 'User' }}
                            </span>
                            <svg v-if="user._id !== currentUserId" class="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </button>

                          <Transition name="pop">
                            <div v-if="activeDropdown === user._id"
                                 class="permission-pop absolute top-full left-1/2 mt-3 w-56 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 z-100 overflow-hidden">
                              <button @click="updateRoleAction(user, 'user')" class="w-full p-5 hover:bg-slate-50 flex items-center gap-4 transition-colors border-b border-slate-50 group/btn text-left">
                                  <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover/btn:scale-110"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg></div>
                                  <div><p class="text-xs font-black text-slate-900">User</p><p class="text-[9px] text-slate-500 font-medium uppercase tracking-tight">Regular Access</p></div>
                              </button>
                              <button @click="updateRoleAction(user, 'admin')" class="w-full p-5 hover:bg-slate-50 flex items-center gap-4 transition-colors group/btn text-left">
                                  <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover/btn:scale-110"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div>
                                  <div><p class="text-xs font-black text-slate-900">Manager</p><p class="text-[9px] text-slate-500 font-medium uppercase tracking-tight">Admin Rights</p></div>
                              </button>
                            </div>
                          </Transition>
                        </div>
                      </div>

                      <div class="col-span-1 xl:col-span-2 flex justify-end">
                        <button
                            v-if="user._id !== currentUserId"
                            @click="openDeleteModal(user)"
                            class="w-11 h-11 flex items-center justify-center transition-all duration-300 rounded-2xl bg-slate-50 text-slate-400/70 hover:text-rose-600 hover:bg-rose-50 hover:shadow-md active:scale-95"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                        <div v-else class="w-11 h-11 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                            <svg class="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </div>

            <div class="px-12 py-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/10">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Viewing Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
              <div class="flex gap-4">
                <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1" class="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase disabled:opacity-20 hover:border-orange-500 transition-all shadow-sm">Back</button>
                <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.totalPages" class="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase disabled:opacity-20 hover:border-orange-500 transition-all shadow-sm">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, type ChartData, type ChartOptions } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const useAuth = useAuthStore();
const currentUserId = computed(() => useAuth.user?.id);

interface User { _id: string; userName: string; email: string; role: string; createdAt: string; }

const users = ref<User[]>([]);
const searchQuery = ref('');
const isLoading = ref(false);
const activeDropdown = ref<string | null>(null);
const pagination = reactive({ page: 1, limit: 10, totalPages: 1, totalUsers: 0 });
const toast = reactive({ show: false, message: '' });
const deleteModal = reactive({ show: false, user: null as User | null });

// Logic
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const q = searchQuery.value.toLowerCase();
  return users.value.filter(u => u.userName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
});

const roleCounts = computed(() => {
  return users.value.reduce((acc, u) => {
    acc[u.role === 'admin' ? 'admin' : 'user']++;
    return acc;
  }, { admin: 0, user: 0 });
});

const showToast = (message: string) => {
    toast.message = message; toast.show = true;
    setTimeout(() => toast.show = false, 3000);
};

const openDeleteModal = (user: User) => { deleteModal.user = user; deleteModal.show = true; };
const closeDeleteModal = () => { deleteModal.show = false; setTimeout(() => deleteModal.user = null, 300); };

const executeDelete = async () => {
  if (!deleteModal.user) return;
  const id = deleteModal.user._id;
  closeDeleteModal();
  try {
    const res = await fetch(`${baseUrl}/profile/admin-delete/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${useAuth.token}` }
    });
    if (res.ok) { showToast('Permissions Revoked'); fetchUsers(pagination.page); }
  } catch { showToast('Sync Failure'); }
};

const fetchUsers = async (page = 1) => {
  isLoading.value = true;
  try {
    const res = await fetch(`${baseUrl}/profile/admin-all?page=${page}&limit=${pagination.limit}`, {
      headers: { 'Authorization': `Bearer ${useAuth.token}` }
    });
    const data = await res.json();
    if (res.ok) {
      users.value = data.data;
      pagination.page = data.pagination.page;
      pagination.totalPages = data.pagination.totalPages;
      pagination.totalUsers = data.pagination.totalUsers;
      updateChart();
    }
  } finally { setTimeout(() => isLoading.value = false, 600); }
};

const updateRoleAction = async (user: User, newRole: string) => {
  activeDropdown.value = null;
  const old = user.role;
  user.role = newRole;
  try {
    const res = await fetch(`${baseUrl}/profile/admin-role/${user._id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${useAuth.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    });
    if (res.ok) { showToast(`${newRole.toUpperCase()} SYNCED`); updateChart(); }
    else throw new Error();
  } catch { user.role = old; showToast('Update Interrupted'); }
};

const toggleDropdown = (id: string) => activeDropdown.value = activeDropdown.value === id ? null : id;

const changePage = (p: number) => { if (p > 0 && p <= pagination.totalPages) fetchUsers(p); };

const chartData = reactive<{ roleDist: ChartData<'doughnut'> | null }>({ roleDist: null });
const updateChart = () => {
  chartData.roleDist = {
    labels: ['Managers', 'Users'],
    datasets: [{
      data: [roleCounts.value.admin, roleCounts.value.user],
      backgroundColor: ['#9333ea', '#10b981'],
      borderWidth: 0, borderRadius: 10, spacing: 5
    }]
  };
};

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  cutout: '85%'
};

onMounted(() => {
  fetchUsers();
  window.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.role-selector-container')) activeDropdown.value = null;
  });
});
</script>

<style scoped>
/* List Transitions */
.list-move, .list-enter-active, .list-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(15px); }

/* Modal Transitions */
.modal-outer-enter-active, .modal-outer-leave-active { transition: opacity 0.4s ease; }
.modal-outer-enter-from, .modal-outer-leave-to { opacity: 0; }

.modal-inner-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-inner-leave-active { transition: all 0.3s ease-in; }
.modal-inner-enter-from { opacity: 0; transform: scale(0.8) translateY(30px); }
.modal-inner-leave-to { opacity: 0; transform: scale(0.95); }

/* Dropdown Animation */
.permission-pop {
  transform: translateX(-50%);
  will-change: transform;
}

.pop-enter-active { animation: popIn 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
.pop-leave-active { animation: popIn 0.2s reverse ease-in forwards; }

@keyframes popIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.92); }
  to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}

/* Toast Animation */
.toast-enter-active { animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-leave-active { animation: slideIn 0.4s reverse ease-in; }

@keyframes slideIn {
  from { transform: translateX(120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
