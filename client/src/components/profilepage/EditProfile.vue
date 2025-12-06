<template>
    <div class="w-full relative mb-12">

        <div class="h-56 md:h-64 w-full relative overflow-hidden bg-neutral-900 transition-all duration-300">
            <div class="absolute inset-0 bg-linear-to-r from-stone-900 to-neutral-800"></div>

            <div
                class="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-yellow-600/20 blur-3xl rounded-full pointer-events-none">
            </div>
            <div class="absolute top-1/2 left-0 w-40 h-40 bg-red-900/20 blur-2xl rounded-full pointer-events-none">
            </div>

            <div class="absolute inset-0 opacity-10"
                style="background-image: radial-gradient(#bf9b30 1px, transparent 1px); background-size: 32px 32px;">
            </div>

            <div
                class="absolute inset-0 flex items-center justify-center md:justify-start max-w-6xl mx-auto px-6 pb-12 pointer-events-none">
                <h1
                    class="text-white font-serif text-3xl md:text-4xl font-bold tracking-wide opacity-90 drop-shadow-md">
                    Edit Profile
                </h1>
            </div>
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-20 md:-mt-24">

            <div
                class="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-black/15 overflow-hidden border border-stone-100 flex flex-col md:flex-row">

                <div
                    class="relative md:w-1/3 border-b md:border-b-0 md:border-r border-stone-100 bg-stone-50 overflow-hidden">

                    <div class="absolute inset-0 pointer-events-none z-0">
                        <svg class="absolute -top-12 -left-12 w-48 h-48 text-stone-200 opacity-50 transform -rotate-12"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L14.88 11.53z" />
                        </svg>
                        <svg class="absolute bottom-0 right-0 w-48 h-48 text-stone-200 opacity-50 transform rotate-12 translate-x-1/4 translate-y-1/4"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18 6.8c0-2.21-1.79-4-4-4-1.69 0-3.15 1.05-3.74 2.51C9.68 4.51 8.43 4 7 4c-2.76 0-5 2.24-5 5 0 1.43.61 2.71 1.57 3.63C2.66 13.45 2 14.64 2 16v3h20v-3c0-1.36-.66-2.55-1.57-3.37.96-.92 1.57-2.2 1.57-3.63 0-1.78-.94-3.35-2.34-4.2zM7 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm7 11H4v-1c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3zm6 5h-4v-1c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3z" />
                        </svg>
                    </div>

                    <div class="relative z-10 p-8 flex flex-col items-center text-center h-full justify-center">

                        <div class="relative mb-6 group cursor-pointer">
                            <div
                                class="w-32 h-32 rounded-full p-1 bg-linear-to-tr from-yellow-400 via-yellow-100 to-yellow-500 shadow-xl">
                                <div
                                    class="w-full h-full rounded-full bg-stone-900 text-white flex items-center justify-center overflow-hidden border-4 border-white relative">
                                    <span v-if="form.name" class="font-serif text-4xl font-bold pt-1">
                                        {{ form.name.charAt(0).toUpperCase() }}
                                    </span>
                                    <span v-else class="font-serif text-4xl">U</span>

                                    <div
                                        class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg class="w-6 h-6 text-white mb-1" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span
                                            class="text-[10px] font-bold uppercase tracking-wider text-white">Change</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 class="text-lg font-serif font-bold text-stone-900">Profile Photo</h3>
                        <p class="text-xs text-stone-500 mb-6 max-w-[200px]">Click image to upload. Max 2MB (JPG, PNG)
                        </p>

                        <button type="button"
                            class="w-full py-2.5 px-4 bg-white border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
                            Remove Photo
                        </button>
                    </div>
                </div>

                <div class="p-6 md:p-10 md:w-2/3 bg-white z-10 relative flex flex-col">

                    <form @submit.prevent="saveProfile" class="grow space-y-6">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div class="col-span-2 md:col-span-1">
                                <label
                                    class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Full
                                    Name</label>
                                <input v-model="form.name" type="text"
                                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400"
                                    placeholder="e.g. Emma Smith">
                            </div>

                            <div class="col-span-2 md:col-span-1">
                                <label
                                    class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Phone
                                    Number</label>
                                <input v-model="form.phone" type="tel"
                                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400"
                                    placeholder="+1 (555) 000-0000">
                            </div>

                            <div class="col-span-2">
                                <label
                                    class="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email
                                    Address</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-stone-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input v-model="form.email" type="email"
                                        class="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400"
                                        placeholder="name@example.com">
                                </div>
                                <p class="mt-2 text-xs text-stone-400">Used for login and order receipts.</p>
                            </div>
                        </div>

                        <div class="pt-6 mt-4 border-t border-stone-100 flex items-center justify-end gap-3 md:gap-4">
                            <button type="button" @click="goBack"
                                class="px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 hover:border-stone-300 transition-all">
                                Cancel
                            </button>

                            <button type="submit" :disabled="isLoading"
                                class="px-8 py-3 rounded-xl bg-red-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-900/20 hover:bg-red-900 hover:shadow-red-900/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                <span v-if="isLoading">Saving...</span>
                                <span v-else>Save Changes</span>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { user } = storeToRefs(authStore);

const isLoading = ref(false);

const form = reactive({
    name: '',
    email: '',
    phone: ''
});

// Sync data from store to form
watchEffect(() => {
    if (user.value) {
        const u = user.value as any;
        form.name = u.name || '';
        form.email = u.email || '';
        form.phone = u.phone || '';
    }
});

const goBack = () => {
    router.push('/profile');
};

const saveProfile = async () => {
    isLoading.value = true;
    console.log("Saving Profile Data:", form);

    // Simulate API delay
    setTimeout(() => {
        isLoading.value = false;
        router.push('/profile');
    }, 1000);
};
</script>