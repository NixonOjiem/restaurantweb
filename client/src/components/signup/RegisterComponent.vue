<template>
  <section class="signup-section">
    <div class="signup-card">

      <div class="form-container">
        <div class="signup-header">
          <h2 class="register-title">Create Account</h2>
          <p class="subtitle">Join the culinary experience</p>
        </div>

        <form @submit.prevent="handleRegister">

          <div v-if="error" class="error-banner">
            {{ error }}
          </div>

          <div class="input-group">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="e.g. Gordon Ramsay" required v-model="fullName"
              :disabled="isLoading">
          </div>

          <div class="input-group">
            <label for="userName">Username</label>
            <input type="text" id="userName" placeholder="Pick a username" required v-model="userName"
              :disabled="isLoading">
          </div>

          <div class="input-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com" required v-model="email"
              :disabled="isLoading">
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Create a strong password" required v-model="password"
              :disabled="isLoading">
          </div>

          <button type="submit" class="signup-button" :disabled="isLoading">
            {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
          </button>

          <div class="divider">
            <span>or continue with</span>
          </div>

          <div class="google-btn-wrapper">
            <div id="google-signin-button"
              :style="{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }"></div>
          </div>

        </form>

        <p class="login-redirect">
          Already a member? <a href="/login">Log In</a>
        </p>
      </div>

      <div class="image-container">
        <div class="overlay"></div>
        <img class="img-signup" src="/KFC food.png" alt="Delicious Food">
        <div class="image-text">
          <h3>Taste the Extraordinary</h3>
          <p>Discover recipes from world-class chefs.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia'; // Essential for reactivity

interface GoogleCredentialResponse {
  credential: string; // The JWT ID token
  select_by?: string;
  clientId?: string;
}

defineOptions({
  name: "RegistrationComponent"
});

const router = useRouter();
const authStore = useAuthStore();

const { isLoading, error } = storeToRefs(authStore);

// Reactive state for form
const fullName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');

// --- Handle Standard Registration ---
const handleRegister = async () => {
  // Clear previous errors via store
  authStore.error = null;

  const registrationData = {
    fullName: fullName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
  };

  // Call the Pinia Action
  const success = await authStore.signup(registrationData);

  if (success) {
    console.log('Registration Successful');
    router.push('/');
  }
};

// --- Handle Google Auth ---
const handleGoogleAuthResponse = async (response: GoogleCredentialResponse) => {
  const idToken = response.credential;

  // Call the NEW Pinia Action
  const success = await authStore.googleLogin(idToken);

  if (success) {
    console.log('Google Sign-in Successful');
    router.push('/');
  }
};

onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleAuthResponse
    });

    const buttonElement = document.getElementById("google-signin-button");
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
/* Include all your previous CSS here */
/* ... */

/* ADD THIS for the error message */
.error-banner {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px solid #fca5a5;
}

/* Disabled state for button */
.signup-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* ... Rest of your CSS ... */
:root {
  --primary-color: #d35400;
  --bg-color: #fdfbf7;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
}

.signup-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #fffefadd 0%, #f0e6d2 100%);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 20px;
}

.signup-card {
  display: flex;
  background: #ffffff;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-container {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.signup-header {
  text-align: center;
  margin-bottom: 25px;
}

h2.register-title {
  color: #2c3e50;
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
}

.subtitle {
  color: #7f8c8d;
  margin-top: 5px;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #34495e;
  font-weight: 600;
  font-size: 0.85rem;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  border-color: #d35400;
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.1);
}

.signup-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #d35400, #e67e22);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(211, 84, 0, 0.3);
}

.signup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(211, 84, 0, 0.4);
}

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
}

.login-redirect {
  text-align: center;
  margin-top: 25px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.login-redirect a {
  color: #d35400;
  text-decoration: none;
  font-weight: bold;
}

.login-redirect a:hover {
  text-decoration: underline;
}

.image-container {
  flex: 1.2;
  position: relative;
  display: block;
}

.img-signup {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.image-text {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: white;
  z-index: 2;
}

.image-text h3 {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

.image-text p {
  margin: 5px 0 0;
  font-size: 1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .signup-card {
    flex-direction: column;
    max-width: 450px;
  }

  .image-container {
    display: none;
  }

  .form-container {
    padding: 30px 20px;
  }

  h2.register-title {
    font-size: 1.8rem;
  }
}
</style>
