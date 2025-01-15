<template>
  <ul v-if="props.isMobile" :class="{
    ['menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow']: props.isRoot,
    ['p-2']: !props.isRoot
  }">
    <template v-for="(item, i) in props.categoryList" :key="i">
      <li>
        <RouterLink :to="{
          name: item.routerName
        }">
          {{ item.name }}
        </RouterLink>
        <template v-if="item.categoryList.length > 0">

          <CategoryList :category-list="item.categoryList" :is-root="false"></CategoryList>

        </template>
      </li>
    </template>
  </ul>
  <ul v-else :class="{
    ['menu menu-horizontal px-1']: props.isRoot,
    ['p-2']: !props.isRoot,
  }">
    <template v-for="(item, i) in props.categoryList" :key="i">
      <li>
        <template v-if="item.categoryList.length > 0">
          <details>
            <summary>{{ item.name }}</summary>
            <CategoryList :category-list="getCategoryList(item)" :is-mobile="props.isMobile" :is-root="false">

            </CategoryList>
          </details>
        </template>
        <template v-else>
          <RouterLink :to="{
            name: item.routerName
          }">
            {{ item.name }}
          </RouterLink>
        </template>
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
import { type CategoryModel } from '#vuem/model/model.ts';

const props = withDefaults(defineProps<{
  categoryList: CategoryModel[],
  isRoot?: boolean,
  isMobile?: boolean,
}>(), {
  isRoot: true,
  isMobile: true
})

const getCategoryList = (item: CategoryModel) => {
  if (!item.routerName) {
    return item.categoryList
  }
  const list = [{
    name: 'Перейти',
    routerName: item.routerName,
    categoryList: []
  }, ...item.categoryList] as CategoryModel[]
  return list
}

</script>
