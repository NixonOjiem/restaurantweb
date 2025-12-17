<script setup>
const handleSubmit = async () => {
    console.log("submit button clicked")
}
</script>

<template>
  <div class="container">
    <form class="form-box"  @submit.prevent="handleSubmit">
      <h1 class="form-header">Forgot Password Reset</h1>
      <label for="New Password">New Password:</label>
      <input type="password" id="Password" placeholder="New Password" v-model="NewPassword">
  <br></br>
     <label for="Confirm Password">Confirm Password:</label>
      <input type="password" id="Password" placeholder="Confirm Password">
    </input><br></br>
    <div class="button">
    <button type="submit">Submit</button>
    </div>
    </form>
  </div>
  
</template>

<style scoped>
/*style for the entire page*/
.container{
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:lightyellow;
  font-family: Arial, sans-serif;

}
/*style for the form page*/
.form-box{
   background-color: white;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 350px;
}
/*style for the forgot password reset */
.form-header{
   font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
  letter-spacing: 1px;
  border-bottom: 2px solid blue;
  padding-bottom: 10px;
  text-align: center;
}
/*style for the button*/
  button {
    width: 100%;
    padding: 12px;
    background-color:blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  /*style for the label*/
  label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
/*style for the inputs for the form*/
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
button:hover {
  background-color: #45a049;
}
</style>
 