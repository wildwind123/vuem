<template>
  <div class="form-control w-full ">
    <div v-if="props.label" class="label ">

      <span class="label-text font-semibold " :class="{
        [daisyuiSizeVariant[`text-${props.size}`]]: true,
      }">{{ props.label }}</span>
    </div>
    <div class="flex items-center">
      <input :value="value" @input="changeVal(($event.target as HTMLInputElement).value)" type="text"
        :placeholder="props.placeholder" class="input input-bordered w-full   mr-2" :class="{
          [daisyuiSizeVariant[`input-${props.size}`]]: true,
        }" />
      <div v-if="meta.required" class="inline text-red-500">*</div>
    </div>
    <div v-if="errorMessage" class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { type InputSize, daisyuiSizeVariant } from './model.ts';

const props = withDefaults(defineProps<{
  name: string,
  label?: string,
  placeholder?: string,
  size?: InputSize
}>(), {
  size: 'sm'
})

const emit = defineEmits<{
  (e: 'event:change', v: string | unknown): void
}>()

const changeVal = (v: string) => {
  if (!meta.required && v == "") {
    value.value = undefined
    console.log('changeVal', value.value)
  } else {
    value.value = v
  }
  emit('event:change', value.value)
}

const { value, errorMessage, meta } = useField(() => props.name)


</script>
