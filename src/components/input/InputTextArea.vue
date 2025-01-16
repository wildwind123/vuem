<template>
  <div class="form-control w-full ">
    <div v-if="props.label" class="label">
      <span class="label-text font-semibold">{{ props.label }}</span>
    </div>
    <textarea :value="value" @change="value = ($event.target as HTMLInputElement).value" type="text"
      :placeholder="props.placeholder" class="textarea textarea-bordered w-full input-sm" :class="props.textAreaClass"
      :rows="1000" />
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
  rows?: number
  textAreaClass?: string
}>()


const { value, errorMessage } = useField<string>(() => props.name)


</script>
