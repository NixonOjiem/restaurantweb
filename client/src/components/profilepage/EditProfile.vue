<template>
    <div class="w-full relative mb-6 md:mb-12 py-32 overflow-x-hidden">

        <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
            <svg class="absolute top-0 right-0 w-[800px] h-[800px] text-stone-900 transform translate-x-1/3 -translate-y-1/3 rotate-12"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M18 6.8c0-2.21-1.79-4-4-4-1.69 0-3.15 1.05-3.74 2.51C9.68 4.51 8.43 4 7 4c-2.76 0-5 2.24-5 5 0 1.43.61 2.71 1.57 3.63C2.66 13.45 2 14.64 2 16v3h20v-3c0-1.36-.66-2.55-1.57-3.37.96-.92 1.57-2.2 1.57-3.63 0-1.78-.94-3.35-2.34-4.2zM7 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm7 11H4v-1c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3zm6 5h-4v-1c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v1zm-2-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3 3-3z" />
            </svg>
        </div>

        <div class="max-w-3xl mx-auto relative z-10">

            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-serif font-bold text-stone-900">Edit Profile</h1>
                    <p class="text-stone-500 mt-1">Update your personal details and preferences.</p>
                </div>
                <button @click="goBack"
                    class="text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                    &larr; Back to Dashboard
                </button>
            </div>

            <div class="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">

                <form @submit.prevent="saveProfile" class="divide-y divide-stone-100">

                    <div class="p-8 flex flex-col sm:flex-row items-center gap-8 bg-stone-50/50">
                        <div class="relative group cursor-pointer">
                            <div
                                class="w-24 h-24 rounded-full bg-stone-900 text-white flex items-center justify-center text-4xl font-serif font-bold border-4 border-white shadow-lg overflow-hidden">
                                <span v-if="form.name">{{ form.name.charAt(0).toUpperCase() }}</span>
                                <span v-else>U</span>

                                <div
                                    class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="text-center sm:text-left">
                            <h3 class="text-lg font-bold text-stone-900">Profile Photo</h3>
                            <p class="text-sm text-stone-500 mb-3">Accepts JPG, PNG or GIF (Max 2MB)</p>
                            <div class="flex gap-3 justify-center sm:justify-start">
                                <button type="button"
                                    class="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-sm">
                                    Change
                                </button>
                                <button type="button"
                                    class="px-4 py-2 bg-transparent border border-transparent rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="p-8 space-y-6">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div class="col-span-2 md:col-span-1">
                                <label class="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Full
                                    Name</label>
                                <input v-model="form.name" type="text"
                                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400 font-medium"
                                    placeholder="e.g. Emma Smith">
                            </div>

                            <div class="col-span-2 md:col-span-1">
                                <label
                                    class="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Phone
                                    Number</label>
                                <input v-model="form.phone" type="tel"
                                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400 font-medium"
                                    placeholder="+1 (555) 000-0000">
                            </div>

                            <div class="col-span-2">
                                <label
                                    class="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Email
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
                                        class="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all placeholder-stone-400 font-medium"
                                        placeholder="name@example.com">
                                </div>
                                <p class="mt-2 text-xs text-stone-400">
                                    This email will be used for order receipts and account recovery.
                                </p>
                            </div>

                        </div>

                    </div>

                    <div class="p-8 bg-stone-50/50 flex items-center justify-end gap-4">
                        <button type="button" @click="goBack"
                            class="px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold text-sm hover:bg-white hover:shadow-sm transition-all">
                            Cancel
                        </button>

                        <button type="submit" :disabled="isLoading"
                            class="px-8 py-3 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-xl shadow-stone-900/10 hover:bg-stone-800 hover:shadow-stone-900/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                            <span v-if="isLoading">Saving...</span>
                            <span v-else>Save Changes</span>
                        </button>
                    </div>

                </form>
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

// Reactive form state
const form = reactive({
    name: '',
    email: '',
    phone: ''
});

// --- FIX FOR EMAIL ---
// This watches for when the user data loads from the store and fills the form.
// Using 'any' casting to bypass strict typing if properties are missing in interface
watchEffect(() => {
    if (user.value) {
        const u = user.value as any;
        form.name = u.name || '';
        form.email = u.email || ''; // Ensures email is pulled if it exists
        form.phone = u.phone || '';
    }
});

const goBack = () => {
    router.push('/profile');
};

const saveProfile = async () => {
    isLoading.value = true;

    // SIMULATED API CALL
    // Replace this with: await authStore.updateProfile(form);
    console.log("Saving Profile Data:", form);

    setTimeout(() => {
        isLoading.value = false;
        router.push('/profile');
    }, 1000);
};
</script>