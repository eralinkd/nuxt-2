<template>
  <div>
    <h1>Main page</h1>
  </div>
</template>

<script setup>
const { user } = useUser();

definePageMeta({
  middleware: "auth",
});
</script>
