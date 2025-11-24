<template>
    <section class="section">
        <div class="signinContainer">
            <div class="restForm">
                <div class="signupTitle">
                    <h2>Sign Up</h2>
                </div>
                <form>

                    <div class="fullname">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" required>
                    </div>

                    <div class="username">
                        <label>User Name </label>
                        <input type="text" placeholder="Enter your user name" required >
                    </div>

                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required>

                    <label>Password</label>
                    <input type="password" placeholder="Enter password" required>

                    <button type="submit">Create Account</button>
                </form>
            </div>
            
            <div class="ImageContainer">
                <img class="imgSignup" src="/KFC food.png" alt="Food">
            </div>
        </div>
    </section>
</template>

<style>
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        /* Kept background, removed centering properties */
        background: skyblue;
        font-family: Arial, sans-serif;
    }

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
    }
    .signupTitle{
        margin-bottom: 5px;
        font: bold;
    }
    .signupTitle h2{
       font-weight: bold;
        font: bold;
        text-transform: uppercase;/*makes the signup word capital*/
    }
    .restForm{
        margin-right: 2rem;
        border: #555 2px;
    }

    /* Existing styles for the image container */
    .ImageContainer{
        flex: 1.2;
        background-color: pink ;
        /* Added height to ensure the image container doesn't stretch past content */
        height: auto; 
    }

    .imgSignup{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    /* Existing styles for the main content box */
    .signinContainer{
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

    button {
        width: 100%;
        padding: 12px;
        background: skyblue;
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
    // Your script block remains empty
</script>