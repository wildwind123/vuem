<template>
  <div v-if="props.limit != undefined && props.offset != undefined">
    <div class="join flex  justify-center flex-wrap mb-4">
      <template v-if="currentPage != 1 && (pages[0] ?? 0) != 1">
        <button class="join-item btn " @click="toPage(1)" :class="{
          ['btn-sm']: props.mode == 'small'
        }">1</button>
      </template>
      <template v-if="(pages[0] ?? 0) > 2">
        <button class="join-item btn  disabled" :class="{
          ['btn-sm']: props.mode == 'small'
        }">...</button>
      </template>
      <template v-for="page in pages" :key="page">
        <button @click="toPage(page)"
          :class="{ ['btn-active']: page == currentPage, ['btn-sm']: props.mode == 'small' }" class="join-item btn">{{
            page }}</button>
      </template>
      <template v-if="(pages[pages.length - 1] ?? 0) < latestPage - 1">
        <button :class="{
          ['btn-sm']: props.mode == 'small'
        }" class="join-item btn  disabled">...</button>
      </template>
      <template v-if="(pages[pages.length - 1] ?? 0) < latestPage">
        <button :class="{
          ['btn-sm']: props.mode == 'small'
        }" class="join-item btn " @click="toPage(latestPage)">{{ latestPage }}</button>
      </template>

    </div>
    <div class="flex  justify-center">
      <template v-if="currentPage - 1 > 0">

      </template>
      <button :class="{ ['btn-disabled']: currentPage - 1 <= 0, ['btn-sm']: props.mode == 'small' }"
        @click="toPage(currentPage - 1)" class="join-item btn  ">Предыдущий</button>
      <button :class="{ ['btn-disabled']: currentPage + 1 > latestPage, ['btn-sm']: props.mode == 'small' }" @click="() => {
        toPage(currentPage + 1)
      }" class="join-item btn  ">Следующий</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  limit?: number
  offset?: number
  count?: number
  requestUrl?: string
  mode?: 'small'
}>()

const emit = defineEmits<{
  (e: 'toPage', limit?: number, offset?: number): void,
  (e: 'toRequestUrl', requestUrl: string): void,
}>()

const maxItems = 2

const currentPage = computed(() => {
  if (props.limit == undefined || props.offset == undefined) {
    return 1
  }

  if (props.offset == 0) {
    return 1
  }

  return (props.offset / props.limit) + 1
})

const latestPage = computed(() => {
  if (props.limit == undefined || props.offset == undefined) {
    return 0
  }
  return Math.ceil((props.count ?? 0) / props.limit)
})

const pages = computed(() => {
  const leftPages: number[] = []
  for (let i = 0; i < maxItems; i++) {
    const p = currentPage.value - (i + 1)
    if (p <= 0) {
      continue
    }
    leftPages.unshift(p)
  }

  const rigthPages: number[] = []
  for (let i = 0; i < maxItems; i++) {
    const p = currentPage.value + (i + 1)
    if (p > latestPage.value) {
      continue
    }
    rigthPages.push(p)
  }

  return [...leftPages, currentPage.value, ...rigthPages]
})

const toPage = (page: number) => {
  if (props.limit == undefined || props.offset == undefined) {
    return
  }
  let offset = 0
  offset = page * props.limit - props.limit
  emit('toPage', props.limit, offset)
  if (props.requestUrl !== undefined && props.requestUrl !== "") {
    console.log(props.requestUrl)
    const url = new URL(props.requestUrl);
    const params = url.searchParams;
    params.set("limit", props.limit.toString())
    params.set("offset", offset.toString())
    emit('toRequestUrl', url.toString())
  } else if (props.requestUrl === "") {
    emit('toRequestUrl', "/")
  }
}

</script>
