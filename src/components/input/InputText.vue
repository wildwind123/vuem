<template>
  <div class="form-control w-full ">
    <div v-if="props.label" class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <div class="flex items-center">
      <input v-bind="$attrs" :value="value" @change="value = ($event.target as HTMLInputElement).value" type="text"
        :placeholder="props.placeholder" class="input input-bordered w-full  input-sm mr-2" />
      <div v-if="meta.required" class="inline text-red-500">*</div>
    </div>
    <div v-if="errorMessage" class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
}>()

const { value, errorMessage, meta } = useField(() => props.name)


</script>
