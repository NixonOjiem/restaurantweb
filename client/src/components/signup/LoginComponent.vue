<template>
  <section class="login-section">
    <div class="banner-wrapper">
      <div class="swing-container">
        <div class="login-rope"></div>
        <div class="login-banner-text">Welcome To Cuisine Élégante</div>
      </div>
    </div>

    <div class="login-container">
      <h2>Log In</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="email">Email Address</label>
          <input id="email" type="email" placeholder="Enter your email" required v-model="email"
            :disabled="isLoading" />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Enter password" required v-model="password"
            :disabled="isLoading" />
        </div>
        <div class="forgot-password">
          <a href="/forgot-password" class="forgot-link">Forgot Password?</a>
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>

        <button class="login-btn" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>

        <div class="divider">
          <span>or continue with</span>
        </div>

        <div class="google-btn-wrapper">
          <div id="google-login-button"
            :style="{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }"></div>
        </div>

      </form>
      <p class="register-link">
        Don't have an account? <a href="/signup">Register</a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'; // <--- Added onMounted
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

interface GoogleCredentialResponse {
  credential: string; // The JWT ID token
  select_by?: string;
  clientId?: string;
}

// --- Local State ---
const email = ref('');
const password = ref('');
console.log(email)

// --- Pinia and Router ---
const router = useRouter();
const authStore = useAuthStore();
const { isLoading, error } = storeToRefs(authStore);

// --- Standard Login Handler ---
const handleSubmit = async () => {
  authStore.error = null;

  const loginDetails = {
    email: email.value,
    password: password.value,
  };

  const success = await authStore.login(loginDetails);

  if (success) {
    console.log('Login successful! Navigating home...');
    router.push('/');
  }
};

// --- ADDED: Google Auth Handler ---
const handleGoogleAuthResponse = async (response: GoogleCredentialResponse) => {
  const idToken = response.credential;

  // Use the googleLogin action we created in the store previously
  const success = await authStore.googleLogin(idToken);

  if (success) {
    console.log('Google Login Successful');
    router.push('/');
  }
};

// --- ADDED: Initialize Google Button on Mount ---
onMounted(() => {

  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleAuthResponse
    });

    // Note: using 'google-login-button' ID here to correspond with template
    const buttonElement = document.getElementById("google-login-button");

    if (buttonElement) {
      window.google.accounts.id.renderButton(
        buttonElement,
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }
});
</script>

<style scoped>
/* --- Keep your existing styles --- */
:root {
  --primary-color: #d35400;
  --primary-hover: #a04000;
  --bg-color: #fdfbf7;
  --card-bg: #ffffff;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --rope-color: #5d4037;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9em;
}

.login-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.login-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fdfbf7;
  background: radial-gradient(circle at center, #fffefadd 0%, #f0e6d2 100%);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;
}

/* ... Floating Banner styles (omitted for brevity, keep your existing ones) ... */
.banner-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding-top: 0;
}

.swing-container {
  transform-origin: top center;
  animation: swing 3.5s ease-in-out infinite alternate;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-rope {
  width: 3px;
  height: 120px;
  background: repeating-linear-gradient(45deg, #5d4037, #5d4037 5px, #4e342e 5px, #4e342e 10px);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.login-banner-text {
  background: #fff;
  color: #d35400;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid #d35400;
  box-shadow: 0 8px 20px rgba(211, 84, 0, 0.3);
  white-space: nowrap;
  position: relative;
  top: -5px;
}

.login-container {
  background: #ffffff;
  padding: 40px 30px;
  width: 90%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  position: relative;
  z-index: 5;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: 800;
  font-size: 2rem;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: 600;
  font-size: 0.9rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  border-color: #d35400;
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.1);
}

.forgot-password {
  text-align: right;
  margin-bottom: 25px;
}

.forgot-link {
  color: #7f8c8d;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #d35400;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #d35400, #e67e22);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 5px 15px rgba(211, 84, 0, 0.4);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(211, 84, 0, 0.6);
}

.login-btn:active {
  transform: translateY(0);
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.register-link a {
  color: #d35400;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}

/* --- ADDED: Divider & Google Button Styles --- */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #bdc3c7;
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ecf0f1;
}

.divider span {
  padding: 0 10px;
}

.google-btn-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  /* Adds space before register link */
}

/* --- Animations --- */
@keyframes swing {
  0% {
    transform: rotate(-6deg);
  }

  100% {
    transform: rotate(6deg);
  }
}

/* --- Media Queries --- */
@media (max-width: 480px) {
  .login-rope {
    height: 60px;
  }

  .login-banner-text {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  .login-container {
    padding: 30px 20px;
    margin-top: 60px;
  }

  h2 {
    font-size: 1.5rem;
  }
}

@media (max-height: 600px) {
  .banner-wrapper {
    display: none;
  }

  .login-container {
    margin-top: 0;
  }
}
</style>
