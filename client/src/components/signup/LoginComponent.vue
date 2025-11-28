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
            <form @submit.prevent>
                <div class="input-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required />
                </div>
                <div class="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" required />
                </div>
                <div class="forgot-password">
                    <a href="/forgot-password" class="forgot-link">Forgot Password?</a>
                </div>
                <button class="login-btn" type="submit">Log In</button>
            </form>
            <p class="register-link">
                Don't have an account? <a href="/signup">Register</a>
            </p>
        </div>
    </section>
</template>

<script setup lang="ts"></script>
<style scoped>
:root {
    --primary-color: #d35400;
    --primary-hover: #a04000;
    --bg-color: #fdfbf7;
    --card-bg: #ffffff;
    --text-main: #2c3e50;
    --text-muted: #7f8c8d;
    --rope-color: #5d4037;
}

/* --- Main Section --- */
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

/* --- Floating Banner --- */
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
    /* Rope Length */
    background: repeating-linear-gradient(45deg,
            #5d4037,
            #5d4037 5px,
            #4e342e 5px,
            #4e342e 10px);
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

/* --- Login Card --- */
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

/* --- Form Elements --- */
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
    /* Ensures padding doesn't break width */
}

input:focus {
    border-color: #d35400;
    background: #fff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(211, 84, 0, 0.1);
}

/* --- Links & Buttons --- */
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

/* --- Animations --- */
@keyframes swing {
    0% {
        transform: rotate(-6deg);
    }

    100% {
        transform: rotate(6deg);
    }
}

/* --- Responsive Media Queries --- */
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