<template>
    <section class="forgot-section">
        <div class="container">
            <h2 class="forgot-title">Forgot Password</h2>
            <form>
                <div class="input-email">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required>
                </div>

                <button class="forgot-btn" type="submit">Reset Password</button>
            </form>
        </div>
    </section>
</template>
<style>
.floating-banner {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    animation: swing 3s ease-in-out infinite alternate;
    transform-origin: top center;
}

.rope {
    width: 2px;
    height: 40px;
    background-color: #444;
    margin: 0 auto;
}

.banner-text {
    background-color: #f8e9c4;
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    border: 1px solid #c5a676;
    display: inline-block;
    transform: rotate(-2deg);
}

@keyframes swing {
    0% {
        transform: translateX(-50%) rotate(-5deg);
    }

    50% {
        transform: translateX(-50%) rotate(5deg);
    }

    100% {
        transform: translateX(-50%) rotate(-5deg);
    }
}

.forgot-section {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightyellow;
    font-family: Arial, sans-serif;
}

.container {
    background: darkorange;
    padding: 30px;
    width: 350px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2.forgot-title {
    text-align: center;
    color: #444;
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 6px;
    color: #555;
}

input[type="text"].input-email,
input[type="email"].input-email,
input[type="password"].input-email {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fafafa;
}

.forgot-btn {
    width: 100%;
    padding: 12px;
    background: blue;
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #555;
}

.forgot-link a {
    color: skyblue;
    text-decoration: none;
    font-weight: normal;
}

.forgot-link a:hover {
    text-decoration: underline;
}

.forgot-link {
    display: block;
    text-align: right;
    margin-top: -15px;
    margin-bottom: 20px;
    font-size: 14px;
}
</style>
<script setup lang="ts"></script>