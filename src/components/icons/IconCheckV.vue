<template>
  <MaterialSymbolsCheckCircleOutline :height="props.height" :width="props.width"></MaterialSymbolsCheckCircleOutline>
</template>
<script setup lang="ts">
import MaterialSymbolsCheckCircleOutline from '~icons/material-symbols/check-circle-outline';
const props = withDefaults(defineProps<{
  height?: number
  width?: number
}>(), {
  height: 16,
  width: 16
})
</script>
