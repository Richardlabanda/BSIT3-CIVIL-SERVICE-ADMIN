<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Sign In</h2>
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button @click="signIn" :disabled="loading">
        {{ loading ? "Signing In..." : "Sign In" }}
      </button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();

const signIn = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/dashboard"); // Navigate to the dashboard after sign-in
  } catch (error) {
    errorMessage.value = "Invalid email or password.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
