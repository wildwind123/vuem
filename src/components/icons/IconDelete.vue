<template>
  <MaterialSymbolsDeleteForeverSharp :height="props.height" :width="props.width"></MaterialSymbolsDeleteForeverSharp>
</template>
<script setup lang="ts">
import MaterialSymbolsDeleteForeverSharp from '~icons/material-symbols/delete-forever-sharp';
const props = withDefaults(defineProps<{
  height?: number
  width?: number
}>(), {
  height: 16,
  width: 16
})
</script>
