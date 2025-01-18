<template>
  <PopupWrapper @event:close="emit('event:close')">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ props.label }}</h3>
      <p class="py-4">
        <slot></slot>
      </p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="emit('event:close')">Закрыть</button>
        </form>
      </div>
    </div>
  </PopupWrapper>
</template>
<script lang="ts" setup>
import PopupWrapper from '#vuem/PopupWrapper.vue';
const emit = defineEmits<{
  (e: 'event:close'): void,
}>()
const props = defineProps<{
  label: string
}>()
</script>
