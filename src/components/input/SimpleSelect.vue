<template>
  <select v-model="v" class="select select-bordered">
    <option v-for="item in props.items" :value="item.id" :key="item.id" :disabled="item.disabled">{{ item.value }}
    </option>
  </select>
</template>
<script lang="ts" setup generic="T extends string | number">
import { type TSelect } from './model';
const props = defineProps<{
  items: TSelect<T>[]
}>()
const v = defineModel<T>('defaultValue')
</script>
