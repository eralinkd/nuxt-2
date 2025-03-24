<template>
  <div class="relative">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input"
    />
    <div v-if="error" class="mt-1 text-sm text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "outline"].includes(value),
  },
  size: {
    type: String,
    default: "default",
    validator: (value) => ["sm", "default", "lg"].includes(value),
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;
}
</style>
