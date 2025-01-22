<template>
  <div>
    <div>
      <div v-if="props.label" class="label">
        <span class="label-text font-semibold">{{ props.label }}</span>
      </div>
      <ul>
        <li class="mb-2 text-xs" v-if="(value?.length ?? 0) == 0">
          Не выбрано...
        </li>
        <li class="mb-2" v-for="(item, i) in value" :key="item.id">
          <div class="flex gap-3">
            <div>
              <SimpleSelect v-model:default-value="value![i].id" :items="props.selectList" class="select-xs max-w-xs">
              </SimpleSelect>
            </div>
            <div>
              <input type="text" v-model="value![i].value" class="input input-bordered input-xs">
            </div>
            <button @click="deleteValueByIndex(i)">
              <IconClose></IconClose>
            </button>
          </div>
        </li>
        <li>
          <button class="btn btn-sm" @click="addNew">Добавить</button>
        </li>
      </ul>
      <div v-if="errorMessage" class="label">
        <span class="label-text text-red-500">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup generic="T extends string | number">
import { useField } from 'vee-validate';
import { type TSelect, type TSelectedAttribute } from './model';
import SimpleSelect from './SimpleSelect.vue';
import IconClose from '../icons/IconClose.vue';
import { watch } from 'vue';

const props = defineProps<{
  selectList: TSelect<T>[]
  name: string
  label?: string
}>()


const addNew = () => {
  const newValues: TSelectedAttribute<T>[] = value.value ?? []
  newValues.push({
    id: 1 as T,
    value: '00'
  })
  setValue(newValues as TSelectedAttribute<T>[])
}

const deleteValueByIndex = (index: number) => {
  const newValues: TSelectedAttribute<T>[] = value.value ?? []
  setValue(newValues.filter((_, i) => index != i))
}

const { value, setValue, errorMessage, validate } = useField<TSelectedAttribute<T>[] | undefined>(() => props.name)


watch(value, () => {
  validate()
}, {
  deep: true
})

</script>
