<template>
  <button class="button" :class="{ secondary }">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  secondary: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #fff;
  }

  &.secondary {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    &:hover {
      background-color: #000;
      color: #fff;
      border: 1px solid #fff;
    }
  }
}
</style>
