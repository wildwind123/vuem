export type TSelect<T extends string | number> = {
  id: T
  value: string
  disabled: boolean
}

export type TSelectStyled<T extends string | number> = TSelect<T> & {
  class?: string
}

export type TSelectedAttribute<T extends string | number> = {
  id: T
  value: string
}
