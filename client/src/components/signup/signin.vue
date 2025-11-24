<template>
    <div class="container">
        <h2>Sign Up</h2>
        <form>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required>

            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required>

            <label>Password</label>
            <input type="password" placeholder="Enter password" required>

            <button type="submit">Create Account</button>
        </form>
    </div>
    </template>
    <style>
       body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: skyblue; /* sky blue background */
            font-family: Arial, sans-serif;
        }

        .container {
            background: #f5f5f5; /* greyish box */
            padding: 30px;
            width: 350px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
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

        button {
            width: 100%;
            padding: 12px;
            background: blue; /* blue button */
            border: none;
            border-radius: 6px;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background: #555;
        }
</style>
<script>
</script>