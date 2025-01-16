<template>
  <div class="flex gap-4">
    <div v-for="item in props.items" class="badge badge-accent" :key="item.id">{{ item.value }}<button
        @click="emit('event:close', item)" class="ml-4">
        <IconClose></IconClose>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type TSelect } from './model';
import IconClose from '../icons/IconClose.vue';

const props = defineProps<{
  items: TSelect[]
}>()

const emit = defineEmits<{
  (e: 'event:close', v: TSelect): void
}>()

</script>
