export type TSelect = {
  id: number | string
  value: string
  disabled: boolean
}

export interface TSelectStyled extends TSelect {
  class?: string
}
