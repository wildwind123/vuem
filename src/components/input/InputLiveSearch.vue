<template>
  <div>
    <div v-if="props.label" class="label flex justify-start">
      <span class="label-text font-semibold mr-4"> {{ props.label }} </span>
      <button class="mr-4" @click="modeSearch = !modeSearch">
        <IconEditSquare v-if="!modeSearch"></IconEditSquare>
        <IconClose v-else></IconClose>
      </button>
      <span v-if="props.isLoading" class="loading loading-spinner"></span>
    </div>
    <div class="border p-2">
      <div>
        <div>
          <template v-if="badgeList.length > 0">
            <SelectedItems :items="badgeList" @event:close="delItem"></SelectedItems>
          </template>
          <template v-else>
            <div>
              Не выбрано...
            </div>
          </template>
        </div>
      </div>
      <div v-if="modeSearch" class="mt-3">
        <input @input="search($event as InputEvent)" type="text" class="input input-bordered w-full  input-sm mr-2">
        <div v-if="chooseItems.length > 0" class="relative w-full">
          <ul class="p-2 flex flex-col gap-1 absolute left-0 top-0 z-10 bg-white w-full shadow-md ">
            <template v-for="item in chooseItemsComputed" :key="item.id">
              <li v-if="item.disabled" :class="item.class">
                {{ item.value }}
              </li>
              <li v-else :class="item.class"><a @click="addItem(item)"
                  class="hover:bg-slate-400 w-full block cursor-pointer">{{
                    item.value
                  }}</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div v-if="errorMessage" class="label">
        <span class="label-text text-red-500">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup generic="T extends string | number">
import { type TSelect, type TSelectStyled } from './model';
import SelectedItems from './SelectedItems.vue';
import IconEditSquare from '../icons/IconEditSquare.vue';
import IconClose from '../icons/IconClose.vue';
import { computed, ref, type Ref } from 'vue';
import { useField } from 'vee-validate';
import { debounce } from '../xutils/xutils';

const props = defineProps<{
  selectedItems: TSelect<T>[]
  name: string
  label?: string
  chooseItems: TSelect<T>[]
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'event:search', v: string): void
}>()


const search = debounce((e: InputEvent) => {
  emit('event:search', (e.target as HTMLInputElement).value)
}, 700);

const modeSearch = ref(false)
const newChoosenItems = ref<TSelect<T>[]>([]) as Ref<TSelect<T>[]>
const delItemIds = ref<T[]>([]) as Ref<T[]>

const { value, setValue, errorMessage } = useField<(number | string)[] | undefined>(() => props.name)

const badgeList = computed<TSelectStyled<T>[]>(() => {
  const list: TSelectStyled<T>[] = []
  for (let i = 0; i < props.selectedItems.length; i++) {
    if (!(value.value ?? []).includes(props.selectedItems[i].id)) {
      continue
    }
    if (delItemIds.value.includes(props.selectedItems[i].id)) {
      list.push({ ...props.selectedItems[i], class: 'bg-red-400' })
      continue
    }
    list.push(props.selectedItems[i])
  }

  for (let i = 0; i < newChoosenItems.value.length; i++) {
    if (!(value.value ?? []).includes(newChoosenItems.value[i].id)) {
      continue
    }
    if (props.selectedItems.map(v => v.id).includes(newChoosenItems.value[i].id)) {
      continue
    }

    list.push({ ...newChoosenItems.value[i], class: 'bg-blue-400' })
  }

  return list
})

const chooseItemsComputed = computed<TSelectStyled<T>[]>(() => {
  const list: TSelectStyled<T>[] = []

  for (let i = 0; i < props.chooseItems.length; i++) {
    if (delItemIds.value.includes(props.chooseItems[i].id)) {
      list.push({ ...props.chooseItems[i], class: 'bg-red-400' })
      continue
    }

    const existInValues = (value.value ?? []).includes(props.chooseItems[i].id)

    if (newChoosenItems.value.map(v => v.id).includes(props.chooseItems[i].id) && existInValues) {
      list.push({ ...props.chooseItems[i], disabled: true, class: 'bg-blue-400' })
      continue
    }

    if (existInValues) {
      list.push({ ...props.chooseItems[i], disabled: true, class: 'bg-accent' })
      continue
    }


    list.push(props.chooseItems[i])
  }

  return list
})

const addItem = (item: TSelect<T>) => {
  if ((value.value ?? []).includes(item.id)) {
    return
  }
  const newItems = [...(value.value ?? [])]
  newItems.push(item.id)
  setValue(newItems)
  if (newChoosenItems.value.map(v => v.id).includes(item.id)) {
    return
  }

  newChoosenItems.value.push(item)
}

const delItem = (item: TSelectStyled<T>) => {
  setValue((value.value ?? []).filter(v => v != item.id))
}

</script>
