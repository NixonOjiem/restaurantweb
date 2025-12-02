<template>
  <section class="signup-section">
    <div class="signup-card">

      <div class="form-container">
        <div class="signup-header">
          <h2 class="register-title">Create Account</h2>
          <p class="subtitle">Join the culinary experience</p>
        </div>

        <form @submit.prevent="handleRegister">

          <div class="input-group">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="e.g. Gordon Ramsay" required v-model="fullName">
          </div>

          <div class="input-group">
            <label for="userName">Username</label>
            <input type="text" id="userName" placeholder="Pick a username" required v-model="userName">
          </div>

          <div class="input-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com" required v-model="email">
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Create a strong password" required v-model="password">
          </div>

          <button type="submit" class="signup-button">Sign Up</button>

          <div class="divider">
            <span>or continue with</span>
          </div>

          <div class="google-btn-wrapper">
            <div id="google-signin-button"></div>
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
import { defineOptions, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const ApiBaseurl = import.meta.env.VITE_API_BASE_URL;
const RegisterUrl = `${ApiBaseurl}/auth/signup`;
const GoogleAuthUrl = `${ApiBaseurl}/auth/googleauth`;
const router = useRouter();

defineOptions({
  name: "RegistrationComponent"
});

// 1. Reactive state
const fullName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');

// 2. Handle standard registration
const handleRegister = () => {
  const registrationData = {
    fullName: fullName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
  };

  fetch(RegisterUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Add logic here to redirect or show success message
    })
    .catch((error) => console.error('Error:', error));
};

// 3. Handle Google Auth
const handleGoogleAuthResponse = async (response: any) => {
  const idToken = response.credential;
  try {
    const res = await fetch(GoogleAuthUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (data.success) {
      console.log('Google Sign-in Successful', data.user.name);
      router.push('/');
    } else {
      console.error('Google Sign-in failed on backend:', data.message);
    }
  } catch (error) {
    console.error('Error during Google Sign-in fetch:', error);
  }
};

onMounted(() => {
  if ((window as any).google) {
    (window as any).google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleAuthResponse
    });

    // Render the button inside the DIV, not a button tag
    (window as any).google.accounts.id.renderButton(
      document.getElementById("google-signin-button")!,
      { theme: "outline", size: "large", width: "100%" }
    );
  }
});
</script>

<style scoped>
/* --- Variables --- */
:root {
  --primary-color: #d35400;
  /* Burnt Orange */
  --bg-color: #fdfbf7;
  /* Cream */
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
}

/* --- Layout --- */
.signup-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Matching the Login Gradient */
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
  /* Ensures image respects border radius */
}

/* --- Form Side --- */
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

/* --- Inputs --- */
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

/* --- Buttons --- */
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

/* --- Divider & Google --- */
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

/* --- Login Redirect --- */
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

/* --- Image Side (Desktop Only) --- */
.image-container {
  flex: 1.2;
  /* Slightly wider than form */
  position: relative;
  display: block;
}

.img-signup {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Dark overlay for text readability */
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

/* --- Responsive Media Queries --- */
@media (max-width: 768px) {
  .signup-card {
    flex-direction: column;
    max-width: 450px;
  }

  /* Hide the image on mobile to save space */
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