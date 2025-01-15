<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <CategoryList :root-class="'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'"
          :category-list="props.categoryList"></CategoryList>
      </div>
      <slot name="name">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </slot>
    </div>
    <div class="navbar-center hidden lg:flex">
      <CategoryList :root-class="'menu menu-horizontal px-1'" :category-list="props.categoryList" :is-mobile="false">
      </CategoryList>
    </div>
    <div class="navbar-end">
      <slot name="end">
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CategoryList from '#vuem/CategoryList.vue';
import { type CategoryModel } from '#vuem/model/model.ts';
const props = defineProps<{
  categoryList: CategoryModel[],
  categoryClass?: string
}>()
</script>
