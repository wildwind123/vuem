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

export type InputSize = 'sm' | 'xs'

export const daisyuiSizeVariant = {
  'input-xs': 'input-xs',
  'input-sm': 'input-sm',
  'select-xs': 'select-xs',
  'select-sm': 'select-sm',
  'btn-xs': 'btn-xs',
  'btn-sm': 'btn-sm',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
}
