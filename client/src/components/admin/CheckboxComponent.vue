<template>
  <div class="flex items-center gap-2">
    <input
      v-bind="$attrs"
      type="checkbox"
      v-model="model"
      class="w-4 h-4 text-indigo-600 bg-white border rounded focus:ring-2 focus:ring-indigo-500"
    />
    <label v-if="label" class="font-medium text-slate-700">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  modelValue: boolean;
  error?: string | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});
</script>
