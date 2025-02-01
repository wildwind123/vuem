<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="flex items-center gap-1">
      <select class="select select-bordered select-sm" @change="setCountryCode(($event.target as HTMLSelectElement))">
        <option :selected="countryCode == item[0]" :value="item[0]" class="text-end"
          v-for="(item, i) in countryInfoMapFiltered()" :key="i">
          {{ item[0] }} {{ item[1].icon }} +{{ item[1].prefix }}
        </option>
      </select>
      <input :value="phoneNumber" @input="setValue(($event.target as HTMLInputElement).value)" @keydown="checkDigit"
        type="text" class="input input-bordered input-sm max-w-[180px]">
      <div v-if="!props.allowEmpty" class="inline text-red-500">*</div>
    </div>
    <div>
      <div v-if="errorMessage" class="label">
        <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCountryInfoMap, getPhoneNumber, getCountryCode, type CountryInfo } from '#src/vuem/src/components/xutils/country_map.ts';
import type { CountryCode } from 'libphonenumber-js';
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  name: string,
  allowEmpty?: boolean,
  defaultCountryCode: CountryCode,
  allowedCountryCode?: CountryCode[]
}>(), {
})

const emit = defineEmits<{
  (e: 'event:change', v: string): void
}>()

const checkDigit = (event: KeyboardEvent) => {
  const check = event.key.length === 1 && isNaN(Number(event.key));
  const isShortcut = event.metaKey || event.ctrlKey;
  if (check && !isShortcut) {
    event.preventDefault();
  }
}



const countryInfoMap = getCountryInfoMap()

const countryInfoMapFiltered = () => {
  if ((props.allowedCountryCode ?? []).length == 0) {
    return countryInfoMap;
  }
  const countryCodeInfoMapList = new Map<string, CountryInfo>()

  for (let i = 0; i < (props.allowedCountryCode ?? []).length; i++) {
    if (!countryInfoMap.has(props.allowedCountryCode![i])) {
      continue;
    }
    const v = countryInfoMap.get(props.allowedCountryCode![i])!;
    countryCodeInfoMapList.set(props.allowedCountryCode![i], v);

    const countryCode = getCountryCode(value.value, props.defaultCountryCode)
    if (!countryInfoMap.has(countryCode)) {
      continue;
    }
    countryCodeInfoMapList.set(countryCode, countryCodeInfoMapList.get(countryCode)!);
  }
  return countryCodeInfoMapList;
}

const setValue = (v: string) => {
  value.value = `${countryInfoMap.get(getCountryCode(value.value, props.defaultCountryCode))?.prefix ?? '00'}${getCountryCode(value.value, props.defaultCountryCode)}${v ?? ''}`;
  emit('event:change', value.value)
}

const setCountryCode = (v: HTMLSelectElement) => {
  const cc = v.options[v.selectedIndex].value
  value.value = `${countryInfoMap.get(getCountryCode(value.value, props.defaultCountryCode))?.prefix ?? '00'}${cc}${getPhoneNumber(value.value)}`
  emit('event:change', value.value)
}

const { value, errorMessage } = useField<string | undefined>(() => props.name)

const countryCode = computed(() => {
  return getCountryCode(value.value, props.defaultCountryCode)
})
const phoneNumber = computed(() => {
  return getPhoneNumber(value.value);
})

</script>
