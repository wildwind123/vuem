<template>
  <div class="form-control w-full ">
    <div v-if="props.label" class="label">
      <span class="label-text font-semibold" :class="{
        [daisyuiSizeVariant[`text-${props.size}`]]: true
      }">{{ props.label }}</span>
    </div>
    <textarea :value="value" @change="value = ($event.target as HTMLInputElement).value" type="text"
      :placeholder="props.placeholder" class="textarea textarea-bordered w-full" :class="{
        [props.textAreaClass ?? '']: props.textAreaClass ?? false,
        [daisyuiSizeVariant[`input-${props.size}`]]: true,
      }" :rows="1000" />
    <div v-if="errorMessage" class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { daisyuiSizeVariant, type InputSize } from './model';

const props = withDefaults(defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
  rows?: number
  textAreaClass?: string
  size?: InputSize
}>(), {
  size: 'sm'
})


const { value, errorMessage } = useField<string>(() => props.name)


</script>
