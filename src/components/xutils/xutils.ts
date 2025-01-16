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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: number | null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const later = () => {
      if (timeout !== null) {
        window.clearTimeout(timeout)
        timeout = null
      }
      func.apply(this, args)
    }

    if (timeout !== null) {
      window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(later, wait)
  }
}

export { toIntOrUndefined, toStringOrUndefined, debounce }
