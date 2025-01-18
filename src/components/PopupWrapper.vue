<template>
  <Teleport to="body">
    <div class="flex items-center justify-center fixed left-0 top-0 h-[100vh] w-[100vw]  bg-[rgb(247,247,247,1)]/50">
      <div class="absolute top-0 right-2 inline-block">
        <button @click="emit('event:close')">
          <IconClose class="h-9 w-9"></IconClose>
        </button>
      </div>
      <slot>
      </slot>
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
