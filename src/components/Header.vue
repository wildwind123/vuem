<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    {{ props.label }}
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  label: string
}>()
</script>
