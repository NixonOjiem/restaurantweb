<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto">

      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">User Management</h1>
          <p class="text-slate-500 mt-1">Manage system access and user accounts</p>
        </div>
        <div class="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
          Total Users: <span class="text-orange-600 font-bold">{{ pagination.totalUsers }}</span>
        </div>
      </div>

      <div v-if="isLoading && !users.length" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <div v-else class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th class="px-6 py-4">User Details</th>
                <th class="px-6 py-4">Role</th>
                <th class="px-6 py-4">Joined Date</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in users" :key="user._id" class="hover:bg-slate-50 transition-colors group">

                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg uppercase">
                      {{ user.userName.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800">{{ user.userName }}</p>
                      <p class="text-xs text-slate-500">{{ user.email }}</p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4">
                  <select @change="updateRole(user, ($event.target as HTMLSelectElement).value)" :value="user.role"
                    :disabled="user._id === currentUserId"
                    class="bg-white border text-xs font-bold uppercase rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    :class="user.role === 'admin' ? 'text-purple-700 border-purple-200 bg-purple-50' : 'text-green-700 border-green-200 bg-green-50'">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ formatDate(user.createdAt) }}
                </td>

                <td class="px-6 py-4 text-right">
                  <button @click="confirmDelete(user)" :disabled="user._id === currentUserId"
                    class="text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-2 hover:bg-red-50 rounded-full"
                    title="Delete User">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span class="text-sm text-slate-500">
            Page {{ pagination.page }} of {{ pagination.totalPages }}
          </span>
          <div class="flex gap-2">
            <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1"
              class="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.totalPages"
              class="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const useAuth = useAuthStore();

// Get the current logged-in admin's ID safely
const currentUserId = computed(() => useAuth.user?.id);

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
}

const users = ref<User[]>([]);
const isLoading = ref(false);
const error = ref('');
const pagination = reactive({ page: 1, limit: 10, totalPages: 1, totalUsers: 0 });

// --- API ACTIONS ---

const fetchUsers = async (page = 1) => {
  isLoading.value = true;
  try {
    const token = useAuth.token;
    const response = await fetch(`${baseUrl}/profile/admin-all?page=${page}&limit=${pagination.limit}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    users.value = data.data;
    pagination.page = data.pagination.page;
    pagination.totalPages = data.pagination.totalPages;
    pagination.totalUsers = data.pagination.totalUsers;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const updateRole = async (user: User, newRole: string) => {
  // Optimistic UI update (makes it feel instant)
  const oldRole = user.role;
  user.role = newRole;

  try {
    const token = useAuth.token;
    const response = await fetch(`${baseUrl}/profile/admin-role/${user._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update role');
    }

    // Optional: Show a toast/notification here
    console.log(`Updated ${user.userName} to ${newRole}`);

  } catch (err: any) {
    // Revert UI change if API fails
    user.role = oldRole;
    alert(err.message);
  }
};

const confirmDelete = async (user: User) => {
  if (!confirm(`Are you sure you want to delete ${user.userName}?`)) return;

  try {
    const token = useAuth.token;
    const response = await fetch(`${baseUrl}/profile/admin-delete/${user._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    fetchUsers(pagination.page);
  } catch (err: any) {
    alert(err.message);
  }
};

const changePage = (p: number) => {
  if (p > 0 && p <= pagination.totalPages) fetchUsers(p);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

onMounted(() => {
  fetchUsers();
});
</script>
