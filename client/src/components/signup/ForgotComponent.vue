<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
const forgotPasswordUrl = `${baseUrl}/auth/forgotpassword`;
const resetPasswordUrl = `${baseUrl}/auth/resetpassword`;
const router = useRouter();
const email = ref('');
const resetCode = ref('');
const newPassword = ref('');
const step = ref(1);
const isLoading = ref(false); // Track API status

const handleForgotPassword = async () => {
  isLoading.value = true;
  try {
    await axios.post(`${forgotPasswordUrl}`, { email: email.value });
    step.value = 2;
  } catch (err) {
    alert("Error sending email");
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handleResetPassword = async () => {
  isLoading.value = true;
  try {
    await axios.put(`${resetPasswordUrl}`, {
      email: email.value,
      resetCode: resetCode.value,
      newPassword: newPassword.value
    });
    router.push('/login');
  } catch (err) {
    alert("Invalid code or password error");
    console.error(err.response);
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">
          {{ step === 1 ? 'Forgot Password' : 'Reset Password' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ step === 1
            ? 'No worries! Enter your email and we\'ll send you a code.'
            : 'Check your inbox for the 6-digit code.'
          }}
        </p>
      </div>

      <form v-if="step === 1" @submit.prevent="handleForgotPassword" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input v-model="email" type="email" required placeholder="you@example.com"
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
        </div>
        <button type="submit" :disabled="isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          {{ isLoading ? 'Sending...' : 'Send Reset Code' }}
        </button>
      </form>

      <form v-else @submit.prevent="handleResetPassword" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">6-Digit Code</label>
          <input v-model="resetCode" type="text" required maxlength="6" placeholder="000000"
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 tracking-widest text-center font-mono">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input v-model="newPassword" type="password" required placeholder="••••••••"
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <button type="submit" :disabled="isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          {{ isLoading ? 'Updating...' : 'Update Password' }}
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-gray-100 text-center">
        <router-link to="/login" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          &larr; Back to Login
        </router-link>
      </div>
    </div>
  </section>
</template>
