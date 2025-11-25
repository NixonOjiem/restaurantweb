<template>
    <section>
        <!--The banner part-->
    <div class="floating-banner">
    <div class="rope"></div>
    <div class="banner-text">Welcome To Cuisine Elegante</div>
    </div>

        <div class="container">
            <h2>Log In</h2>
            <form>
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required>

                <label>Password</label>
                <input type="password" placeholder="Enter password" required>
                <p class="forgot-link">
                    <a href="forgot_password.html">Forgot Password?</a>
                </p>

                <button type="submit">Log In</button>
            </form>

            <p class="login-link">
                Don't have an account? <a href="signup.html">Sign Up here</a>
            </p>
        </div>
    </section>
</template>
   <style>
        .floating-banner {
        position: absolute;/*sets how the element is positioned in a document*/
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
       box-shadow: 0 4px 10px rgba(0,0,0,0.15);
       border: 1px solid #c5a676;
       display: inline-block;
       transform: rotate(-2deg);
}
       @keyframes swing {
        0% { transform: translateX(-50%) rotate(-5deg); }
        50% { transform: translateX(-50%) rotate(5deg); }
         100% { transform: translateX(-50%) rotate(-5deg); }
}

        body {
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
            background:darkorange; /* greyish box */
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
        .forgot-link a {
                color: skyblue ; /* Button blue */
                text-decoration: none;
                font-weight: normal;
            }
            .forgot-link a:hover {
                text-decoration: underline;
            }
            .forgot-link {
                display: block;
                text-align: right;
                margin-top: -15px; /* Pull it up closer to the input field */
                margin-bottom: 20px;
                font-size: 14px;
            }
            </style>
<script>
    // Your script block remains empty
</script>