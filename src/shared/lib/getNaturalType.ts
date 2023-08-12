import { parse } from 'mathjs'

const getNaturalType = (value: boolean | number | string) => {
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') {
    if (value === 'true' || value === 'false') return 'boolean'
    if (value !== '' && /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value))
      return 'number'
    try {
      parse(value).compile().evaluate()
      return 'boolean'
    } catch {}
    return 'string'
  }

  throw new Error(`Invalid value provided.`)
}

export { getNaturalType }
