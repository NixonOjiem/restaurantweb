<template>
  <div class="w-full relative mb-6 md:mb-12">

    <div class="h-56 md:h-64 w-full relative overflow-hidden bg-neutral-900 transition-all duration-300">
      <div class="absolute inset-0 bg-linear-to-r from-stone-900 to-neutral-800"></div>
      <div
        class="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-yellow-600/20 blur-3xl rounded-full pointer-events-none">
      </div>
      <div class="absolute top-1/2 left-0 w-40 h-40 bg-red-900/20 blur-2xl rounded-full pointer-events-none"></div>
      <div class="absolute inset-0 opacity-10"
        style="background-image: radial-gradient(#bf9b30 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 -mt-24 md:-mt-32">
      <div
        class="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-black/15 overflow-hidden border border-stone-100 flex flex-col md:flex-row">

        <div class="relative md:w-2/5 border-b md:border-b-0 md:border-r border-stone-100 bg-stone-50 overflow-hidden">

          <div class="absolute inset-0 pointer-events-none z-0">
            <svg class="absolute -top-12 -left-12 w-64 h-64 text-stone-300 opacity-30 transform -rotate-12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L14.88 11.53z" />
            </svg>
            <svg class="absolute -bottom-16 -right-16 w-72 h-72 text-stone-300 opacity-30 transform rotate-12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18 6.8c0-2.21-1.79-4-4-4-1.69 0-3.15 1.05-3.74 2.51C9.68 4.51 8.43 4 7 4c-2.76 0-5 2.24-5 5 0 1.43.61 2.71 1.57 3.63C2.66 13.45 2 14.64 2 16v3h20v-3c0-1.36-.66-2.55-1.57-3.37.96-.92 1.57-2.2 1.57-3.63 0-1.78-.94-3.35-2.34-4.2zM7 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm7 11H4v-1c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3zm6 5h-4v-1c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3z" />
            </svg>
          </div>

          <div class="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">

            <div class="relative mb-4 group">
              <div
                class="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-linear-to-tr from-yellow-400 via-yellow-100 to-yellow-500 shadow-xl transition-all duration-300">
                <div
                  class="w-full h-full rounded-full bg-stone-900 text-white flex items-center justify-center overflow-hidden border-4 border-white">
                  <span v-if="user?.name" class="font-serif text-4xl font-bold pt-1">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                  <span v-else class="font-serif text-4xl">G</span>
                </div>
              </div>
              <div
                class="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm">
              </div>
            </div>

            <h2 class="text-3xl font-serif font-bold text-stone-900 tracking-tight mb-1">
              {{ user?.name }}
            </h2>

            <p class="text-stone-500 font-medium text-sm mb-4">{{ displayEmail }}</p>

            <div
              class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-widest shadow-lg border border-stone-700">
              <span class="text-yellow-400">★</span>
              {{ user?.role || 'Valued Member' }}
            </div>
          </div>
        </div>

        <div class="p-6 md:p-8 md:w-3/5 flex flex-col justify-between bg-white z-10 relative">

          <div class="flex justify-between items-center mb-8">
            <div>
              <p class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Membership</p>
              <p class="text-lg font-serif font-bold text-stone-800 italic">Gold Tier</p>
            </div>
          </div>

          <div
            class="flex items-center w-full border border-stone-200 rounded-2xl bg-stone-50 mb-8 overflow-hidden shadow-sm">
            <div
              class="flex-1 py-5 md:py-6 flex flex-col items-center justify-center group hover:bg-stone-100 transition-colors cursor-default">
              <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-600" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-xs font-bold uppercase tracking-widest text-stone-400">Points</span>
              </div>
              <p
                class="text-3xl font-serif font-bold text-yellow-700 group-hover:scale-110 transition-transform duration-300">
                {{ (user as any)?.points || 0 }}
              </p>
            </div>

            <div class="w-px h-16 bg-stone-200"></div>

            <div
              class="flex-1 py-5 md:py-6 flex flex-col items-center justify-center group hover:bg-stone-100 transition-colors cursor-default">
              <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span class="text-xs font-bold uppercase tracking-widest text-stone-400">Orders</span>
              </div>
              <p
                class="text-3xl font-serif font-bold text-stone-800 group-hover:scale-110 transition-transform duration-300">
                {{ (user as any)?.orders_count || 0 }}
              </p>
            </div>
          </div>

          <div class="flex gap-4 mt-auto">
            <button @click="handleEdit"
              class="flex-1 py-3 px-4 rounded-xl border border-stone-200 font-semibold text-stone-600 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-900 transition-all text-xs md:text-sm uppercase tracking-wide">
              Edit Profile
            </button>
            <button @click="handleLogout"
              class="flex-1 py-3 px-4 rounded-xl bg-red-800 text-white font-semibold shadow-lg shadow-red-900/20 hover:bg-red-900 hover:shadow-red-900/40 transition-all text-xs md:text-sm uppercase tracking-wide">
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const { user, isLoading } = storeToRefs(authStore);

onMounted(async () => {
  await authStore.fetchProfile();
});

const displayEmail = computed(() => {
  const u = user.value as any;

  // 1. If no user data at all
  if (!u) return 'Sign in to view email';

  // 2. If we have an email, return it
  if (u.email && u.email.trim() !== '') {
    return u.email;
  }
  // 3. If loading, indicate that
  if (isLoading.value) {
    return 'Loading email...';
  }

  return 'No email connected';
});

const handleEdit = () => {
  router.push('/profile/edit');
};

const handleLogout = async () => {
  if (authStore.logout) await authStore.logout();
  router.push('/login');
};
</script>