<template>
  <div class="auth-login">
    <h1>Register</h1>
    <UInput v-model="username" placeholder="Username" />
    <UInput v-model="email" placeholder="Email" />
    <UInput v-model="password" placeholder="Password" />
    <div class="btns">
      <UBaseButton secondary @click="navigateTo('/auth/login')">
        Login
      </UBaseButton>
      <UBaseButton @click="register">Register</UBaseButton>
    </div>
  </div>
</template>

<script setup>
import { registerWithEmail } from "@/composables/useAuth";
const username = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  const response = await registerWithEmail(
    username.value,
    email.value,
    password.value
  );
  if (response.accessToken) {
    window.location.reload();
  }
};

definePageMeta({
  middleware: "guest",
});
</script>

<style scoped lang="scss">
.auth-login {
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;

  .btns {
    display: flex;
    gap: 12px;
  }
}
</style>
