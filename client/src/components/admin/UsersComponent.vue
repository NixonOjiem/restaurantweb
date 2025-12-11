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

      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <div v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
        <span>{{ error }}</span>
        <button @click="fetchUsers(pagination.page)" class="text-sm underline font-semibold hover:text-red-800">Try
          Again</button>
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
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  ]">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click="confirmDelete(user)" :disabled="user.role === 'admin'"
                    class="text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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

        <div v-if="users.length === 0" class="text-center py-12">
          <p class="text-slate-500">No users found.</p>
        </div>

        <div class="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span class="text-sm text-slate-500">
            Page {{ pagination.page }} of {{ pagination.totalPages }}
          </span>
          <div class="flex gap-2">
            <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1"
              class="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Previous
            </button>
            <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.totalPages"
              class="px-4 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const useAuth = useAuthStore();

// --- Types ---
interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
}

// --- State ---
const users = ref<User[]>([]);
const isLoading = ref(false);
const error = ref('');
const pagination = reactive({
  page: 1,
  limit: 10,
  totalPages: 1,
  totalUsers: 0
});

// --- Actions ---

const fetchUsers = async (page = 1) => {
  isLoading.value = true;
  error.value = '';

  try {
    const token = useAuth.token;
    // URL matches the backend route we created: /restaurant/v1/user/admin/all
    const response = await fetch(`${baseUrl}/profile/admin-all?page=${page}&limit=${pagination.limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');

    users.value = data.data;

    // Update Pagination State
    pagination.page = data.pagination.page;
    pagination.totalPages = data.pagination.totalPages;
    pagination.totalUsers = data.pagination.totalUsers;

  } catch (err: unknown) {
    console.error(err);
    // error.value = err.message || 'An error occurred loading users.';
  } finally {
    isLoading.value = false;
  }
};

const changePage = (newPage: number) => {
  if (newPage > 0 && newPage <= pagination.totalPages) {
    fetchUsers(newPage);
  }
};

const confirmDelete = async (user: User) => {
  if (!confirm(`Are you sure you want to delete user "${user.userName}"? This cannot be undone.`)) {
    return;
  }

  try {
    const token = useAuth.token;
    const response = await fetch(`${baseUrl}/profile/admin-delete/${user._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Delete failed');

    // Refresh list after delete
    // If we deleted the last item on a page, go back one page
    if (users.value.length === 1 && pagination.page > 1) {
      fetchUsers(pagination.page - 1);
    } else {
      fetchUsers(pagination.page);
    }

  } catch (err: unknown) {
    alert(err);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(() => {
  fetchUsers();
});
</script>
