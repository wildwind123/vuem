<template>
  <MaterialSymbolsClose :height="props.height" :width="props.width"></MaterialSymbolsClose>
</template>
<script setup lang="ts">
import MaterialSymbolsClose from '~icons/material-symbols/close';
const props = withDefaults(defineProps<{
  height?: number
  width?: number
}>(), {
  height: 16,
  width: 16
})
</script>
