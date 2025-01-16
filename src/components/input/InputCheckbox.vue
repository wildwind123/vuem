<template>
  <div class="form-control w-full max-w-xs">
    <div v-if="props.label" class="label">
      <span class="label-text font-semibold">{{ props.label }}</span>
    </div>
    <input @change="handleChange" type="checkbox" :checked="checked" class="checkbox checkbox-md" />
    <div v-if="errorMessage" class="label">
      <span class="label-text text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate';

const props = withDefaults(defineProps<{
  label?: string
  name: string
  placeholder?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedValue?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uncheckedValue?: any,
}>(), {
  checkedValue: true,
  uncheckedValue: false
});

const { handleChange, errorMessage, checked } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.checkedValue,
  uncheckedValue: props.uncheckedValue
});



</script>
