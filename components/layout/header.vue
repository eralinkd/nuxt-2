<template>
  <header class="layout-header">
    <p>Header</p>
  </header>
</template>

<script setup></script>


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
</style>
