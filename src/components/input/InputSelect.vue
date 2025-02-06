<template>
  <div class="form-control ">
    <div v-if="props.label" class="label">
      <span class="label-text font-semibold" :class="{
        [getInputSize(props.size, 'text')]: true,
      }">{{ props.label }}</span>
    </div>
    <select v-model="value" class="select select-bordered" :class="{
      [getInputSize(props.size, 'select')]: true,
    }">
      <option v-if="props.nullable" :value="undefined">Не выбрано</option>
      <template v-for="item in props.values" :key="item.id">
        <option :value="item.id" :disabled="item.disabled">
          {{ item.value }}
        </option>
      </template>
    </select>
    <div v-if="errorMessage" class="label">
      <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { type TSelect } from './model.ts'
import { watch } from 'vue'
import { type InputSize, getInputSize } from './model.ts';

const props = withDefaults(defineProps<{
  name: string
  label?: string
  placeholder?: string
  nullable?: boolean
  values: TSelect<string | number>[]
  size?: InputSize
}>(), {
  size: 'sm'
})

const emit = defineEmits<{
  (e: 'change', v: number | string | undefined): void
}>()

const { value, errorMessage } = useField(() => props.name)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
watch(value, newValue => emit('change', newValue))
</script>
