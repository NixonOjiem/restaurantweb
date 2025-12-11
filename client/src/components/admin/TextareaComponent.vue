<template>
  <div class="w-full">
    <label v-if="label" class="block font-semibold text-xs text-slate-700 mb-1">{{ label }}</label>

    <textarea
      v-bind="$attrs"
      v-model="model"
      class="w-full bg-stone-50 text-stone-800 border border-indigo-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 placeholder-stone-400"

      rows="4"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  modelValue: string | null;
  placeholder?: string;
  error?: string | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val: string | null) => emit("update:modelValue", val),
});
</script>
