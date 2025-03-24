<template>
  <div class="auth-login">
    <h1>Login</h1>
    <UInput v-model="email" placeholder="Email" />
    <UInput v-model="password" placeholder="Password" />
    <div class="btns">
      <UBaseButton secondary @click="navigateTo('/auth/register')">
        Register
      </UBaseButton>
      <UBaseButton @click="login">Login</UBaseButton>
    </div>
  </div>
</template>

<script setup>
import { loginWithEmail } from "@/composables/useAuth";
const email = ref("");
const password = ref("");

const login = async () => {
  const response = await loginWithEmail(email.value, password.value);
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
