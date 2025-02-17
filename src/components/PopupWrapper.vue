<template>
  <Teleport to="body">
    <div
      class="overflow-auto flex items-center justify-center fixed left-0 top-0 h-[100vh] w-[100vw] max-h-[100vh] max-w-[100vw]  bg-[rgb(200,247,255,50)]/70">
      <div class="absolute top-0 right-2 inline-block">
        <button @click="emit('event:close')">
          <IconClose class="h-9 w-9"></IconClose>
        </button>
      </div>
      <div class="border" style="max-height: -webkit-fill-available; max-width: -webkit-fill-available;">
        <slot>
        </slot>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import IconClose from './icons/IconClose.vue';

const overflow = ref('')

const emit = defineEmits<{
  (e: 'event:close'): void
}>()

onMounted(() => {
  disableRootScroll()
})

onUnmounted(() => {
  enableRootScroll()
})

const disableRootScroll = () => {
  const htmlEl = document.querySelector('html')
  if (!htmlEl) {
    return
  }
  // save old state of overflow
  overflow.value = htmlEl.style.overflow
  htmlEl.style.overflow = 'hidden'
}

const enableRootScroll = () => {
  const htmlEl = document.querySelector('html')
  if (!htmlEl) {
    return
  }
  htmlEl.style.overflow = overflow.value
}

</script>
