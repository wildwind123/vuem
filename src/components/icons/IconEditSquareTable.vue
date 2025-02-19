<template>
  <MaterialSymbolsTableEdit :height="props.height" :width="props.width"></MaterialSymbolsTableEdit>
</template>
<script setup lang="ts">
import MaterialSymbolsTableEdit from '~icons/material-symbols/table-edit';
const props = withDefaults(defineProps<{
  height?: number
  width?: number
}>(), {
  height: 16,
  width: 16
})
</script>
