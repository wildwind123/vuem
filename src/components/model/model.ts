import type { RouteMap } from 'vue-router'

type RouterName = keyof RouteMap

type CategoryModel = {
  name: string
  activeClass?: string
  routerName?: RouterName
  categoryList: CategoryModel[]
}

export { type CategoryModel, type RouterName }
