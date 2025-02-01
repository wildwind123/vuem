<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="flex items-center gap-1">
      <select v-model="cValue" class="select select-bordered select-sm  ">
        <option :value="item[0]" class="text-end" v-for="(item, i) in countryInfoMap" :key="i">
          {{ item[0] }} {{ item[1].icon }} +{{ item[1].prefix }}
        </option>
      </select>
      <input v-model="value" @keydown="checkDigit" type="text" class="input input-bordered input-sm">
      <div v-if="!props.allowEmpty" class="inline text-red-500">*</div>
    </div>
    <div>
      <div v-if="errorMessage || cErrorMessage" class="label">
        <span class="label-text-alt text-red-500">{{ errorMessage }}. {{ cErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCountryInfoMap } from '#src/vuem/src/components/xutils/country_map.ts';
import { useField } from 'vee-validate';


const props = defineProps<{
  phoneName: string,
  countryCodeName: string,
  allowEmpty?: boolean
}>()

const checkDigit = (event: KeyboardEvent) => {
  const check = event.key.length === 1 && isNaN(Number(event.key));
  const isShortcut = event.metaKey || event.ctrlKey;
  if (check && !isShortcut) {
    event.preventDefault();
  }
}

const countryInfoMap = getCountryInfoMap()



const { value, errorMessage } = useField(() => props.phoneName)
const { value: cValue, errorMessage: cErrorMessage, } = useField(() => props.countryCodeName)


</script>
