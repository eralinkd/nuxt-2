<template>
  <header class="layout-header">
    <p>Header</p>
    <IconsLogout v-if="isAuthenticated" class="logout-icon" @click="logout" />
  </header>
</template>

<script setup>
const { isAuthenticated } = useUser();
const { logout } = useLogout();
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;
.layout-header {
  background-color: $mainColor;
  color: $bgColor;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.1rem;
}
.logout-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>
