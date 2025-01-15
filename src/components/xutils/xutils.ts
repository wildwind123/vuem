const toIntOrUndefined = <T>(value: T): number | undefined => {
  const v = parseInt(value as never)
  if (isNaN(v)) {
    return undefined
  }
  return v
}

const toStringOrUndefined = <T>(value: T): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const v = (value as string).trim()
  if (v == '') {
    return undefined
  }
  return value
}

export { toIntOrUndefined, toStringOrUndefined }
