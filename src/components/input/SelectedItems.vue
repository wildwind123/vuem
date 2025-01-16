<template>
  <div class="flex gap-4 flex-wrap">
    <div v-for="item in props.items" class="badge" :class="item.class ? item.class : 'bg-accent'" :key="item.id">{{
      item.value }}<button @click="emit('event:close', item)" class="ml-4">
        <IconClose></IconClose>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type TSelectStyled } from './model';
import IconClose from '../icons/IconClose.vue';

const props = defineProps<{
  items: TSelectStyled[]
}>()

const emit = defineEmits<{
  (e: 'event:close', v: TSelectStyled): void
}>()

</script>
