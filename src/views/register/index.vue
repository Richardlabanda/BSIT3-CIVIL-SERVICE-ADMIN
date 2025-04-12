<script setup>
import { ref } from "vue";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("User registered:", userCredential.user);
    alert("Registration successful!");
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Register</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button @click="register">Sign Up</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style>
.register-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  background-color: black;
  color: gold;
  padding: 10px;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
