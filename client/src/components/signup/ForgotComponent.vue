<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const resetCode = ref('');
const newPassword = ref('');
const step = ref(1); // 1: request email, 2: enter code/password

const handleForgotPassword = async () => {
  try {
    await axios.post('/api/restaurant/v1/auth/forgotpassword', { email: email.value });
    step.value = 2;
    alert("Check your email for the code!");
  } catch (err) {
    alert("Error sending email");
    console.log(err);
  }
};

const handleResetPassword = async () => {
  try {
    await axios.put('/api/restaurant/v1/auth/resetpassword', {
      email: email.value,
      resetCode: resetCode.value,
      newPassword: newPassword.value
    });
    alert("Success! Redirecting to login...");
    router.push('/login');
  } catch (err) {
    alert("Invalid code or password error");
    console.log(err);
  }
};
</script>

<template>
  <section class="forgot-section">
    <div class="container">
      <h2 class="forgot-title">{{ step === 1 ? 'Forgot Password' : 'Reset Password' }}</h2>

      <form v-if="step === 1" @submit.prevent="handleForgotPassword">
        <div class="input-email">
          <label>Email Address</label>
          <input type="email" v-model="email" required placeholder="Enter your email">
        </div>
        <button class="forgot-btn" type="submit">Send Reset Code</button>
      </form>

      <form v-else @submit.prevent="handleResetPassword">
        <div class="input-email">
          <label>6-Digit Code</label>
          <input type="text" v-model="resetCode" required placeholder="123456">

          <label>New Password</label>
          <input type="password" v-model="newPassword" required placeholder="Min 6 characters">
        </div>
        <button class="forgot-btn" type="submit">Update Password</button>
      </form>
    </div>
  </section>
</template>
