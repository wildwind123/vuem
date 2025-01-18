<template>
  <div>
    <div v-if="props.label" class="flex font-semibold text-sm items-center">
      <div class="mr-4">
        {{ props.label }}
      </div>
      <button @click="emit('event:edit')">
        <IconEditSquare />
      </button>
    </div>
    <a v-if="props?.photo" class="inline-block" :href="props.photo" target="_blank"><img class="max-h-60 max-w-60 "
        :src="props.photo"></a>

    <div v-else>
      Нету обложки...
    </div>
  </div>
</template>
<script lang="ts" setup>
import IconEditSquare from './icons/IconEditSquare.vue';
const props = defineProps<{
  label?: string
  photo?: string
}>()

const emit = defineEmits<{
  (e: 'event:edit'): void
}>()

</script>
