<template>
  <MaterialSymbolsEditSquare :height="props.height" :width="props.width"></MaterialSymbolsEditSquare>
</template>
<script setup lang="ts">
import MaterialSymbolsEditSquare from '~icons/material-symbols/edit-square';
const props = withDefaults(defineProps<{
  height?: number
  width?: number
}>(), {
  height: 16,
  width: 16
})
</script>
