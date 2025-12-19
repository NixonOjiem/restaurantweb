<template>
<div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block font-semibold text-xs text-slate-700 mb-1">
      {{ label.toUpperCase() }}
    </label>

    <!-- Input -->
    <input
      v-bind="$attrs"
      :type="type"
      v-model="model"
      class="w-full bg-stone-50 text-stone-800 border border-indigo-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 placeholder-stone-400"/>
  </div>
</template>




<script setup lang="ts">
import { computed } from 'vue';

  interface Props {
  label?: string;
  modelValue: string | number | null;
  type?: string;
  error?: string | null;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

// Sync v-model
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

</script>
