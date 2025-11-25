<template>
  <section class="section">
    <div class="signinContainer">
      <div class="restForm">
        <div class="signupTitle">
          <h2>Sign Up</h2>
        </div>
        <form @submit.prevent="handleRegister">

          <div class="fullname">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Enter your full name" required v-model="fullName">
          </div>


          <div class="username">
            <label for="userName">User Name </label>
            <input type="text" id="userName" placeholder="Enter your user name" required v-model="userName">
          </div>

          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" required v-model="email">

          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required v-model="password">

          <button type="submit" class="signup-button">Create Account</button>
          <p class="text-center ">or</p>
          <button type="button" class="signup-button google-signup-button" id="google-signin-button">
            Signin with google
          </button>
        </form>
      </div>

      <div class="ImageContainer">
        <img class="imgSignup" src="/KFC food.png" alt="Food">
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

// 1. Reactive state for all form inputs
const fullName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');



// 3. Function to handle form submission
const handleRegister = () => {
  // Destructure the required data for clarity
  const registrationData = {
    fullName: fullName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,

  };

  fetch(RegisterUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));

};

// --- Google Sign-in Logic ---
// 1. Function to send the Google ID token to the backend
const handleGoogleAuthResponse = async (response: any) => {
  // response.credential contains the Google ID Token
  const idToken = response.credential;

  try {
    const res = await fetch(GoogleAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the ID token to your backend
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (data.success) {
      console.log('Google Sign-in Successful', data.user.name);
      // TODO: Handle token storage (if not using httpOnly cookies)
      router.push('/'); // Redirect user
    } else {
      console.error('Google Sign-in failed on backend:', data.message);
    }
  } catch (error) {
    console.error('Error during Google Sign-in fetch:', error);
  }
};

// 2. Initialize Google Sign-in on component mount
onMounted(() => {
  // Check if google is available (it should be, due to the script in index.html)
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // YOUR CLIENT ID
      callback: handleGoogleAuthResponse // The function to call with the token
    });

    // Render the Google button inside the specified div
    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" } // Customization options
    );
  }
});

</script>

<style scoped>
/* New styles for the section element to achieve centering */
.section {
  /* Makes the section take the full height of the viewport */
  height: 100vh;
  /* Enables flexbox alignment */
  display: flex;
  /* Centers content vertically (on the cross-axis) */
  align-items: center;
  /* Centers content horizontally (on the main-axis) */
  justify-content: center;
  background: skyblue;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.signupTitle {
  margin-bottom: 5px;
  font: bold;
}

.signupTitle h2 {
  font-weight: bold;
  font: bold;
  text-transform: uppercase;
  /*makes the signup word capital*/
}

.restForm {
  margin-right: 2rem;
  border: #555 2px;
}

/* Existing styles for the image container */
.ImageContainer {
  flex: 1.2;
  background-color: pink;
  /* Added height to ensure the image container doesn't stretch past content */
  height: auto;
}

.imgSignup {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* Existing styles for the main content box */
.signinContainer {
  background: #f5f5f5;
  display: flex;
  padding: 30px;
  flex-direction: row;
  align-items: stretch;
  width: 800px;
  /* margin: auto; is now redundant but harmless with flexbox centering */
  margin: auto;
  border-radius: 10px;
}

h2 {
  text-align: center;
  color: #444;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fafafa;
}

.signup-button {
  width: 100%;
  padding: 12px;
  background: skyblue;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 5px;
  /* Added spacing */
}

.signup-button:hover {
  background: #555;
}

.google-signup-button {
  background: #4285F4;
  /* Google blue */
}

.google-signup-button:hover {
  background: #3c78d8;
}

.text-center {
  text-align: center;
  margin: 10px 0;
}
</style>
