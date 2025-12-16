<template>
  <div class="w-full">
    <label v-if="label" class="block font-semibold text-xs text-slate-700 mb-1">{{ label }}</label>

    <select
      v-bind="$attrs"
      :multiple="multiple"
      v-model="model"
      class="w-full bg-stone-50 text-stone-800 border border-indigo-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 placeholder-stone-400"
    >
      <option v-if="placeholder && !multiple" disabled value="">{{ placeholder }}</option>
      <option
        v-for="(opt, idx) in normalizedOptions"
        :key="idx"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Opt = { value: string | number; label: string } | string | number;

interface Props {
  label?: string;
  modelValue: any;
  options?: Opt[];
  placeholder?: string;
  multiple?: boolean;
  error?: string | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const normalizedOptions = computed(() =>
  (props.options ?? []).map((o) =>
    typeof o === "object" ? (o as { value: string | number; label: string }) : { value: o, label: String(o) }
  )
);

const model = computed({
  get: () => props.modelValue,
  set: (val: any) => emit("update:modelValue", val),
});
</script>
