<template>
  <div>
    <div v-if="props.label" class="label flex justify-start">
      <span class="label-text font-semibold mr-4"> {{ props.label }} </span>
      <button @click="modeSearch = !modeSearch">
        <IconEditSquare></IconEditSquare>
      </button>
    </div>
    <div class="border p-2">
      <div>
        <div>
          <template v-if="props.selectedItems.length > 0">
            <SelectedItems :items="props.selectedItems"></SelectedItems>
          </template>
          <template v-else>
            <div>
              Не выбрано...
            </div>
          </template>
        </div>
      </div>
      <div v-if="modeSearch" class="mt-3">
        <input type="text" class="input input-bordered w-full  input-sm mr-2">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type TSelect } from './model';
import SelectedItems from './SelectedItems.vue';
import IconEditSquare from '../icons/IconEditSquare.vue';
import { ref } from 'vue';

const props = defineProps<{
  selectedItems: TSelect[]
  name: string
  label?: string
}>()

const modeSearch = ref(false)

</script>
