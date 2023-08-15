const getNaturalType = (
  value: boolean | number | string
): {
  type: 'boolean' | 'number' | 'string'
  value: boolean | number | string
} => {
  if (typeof value === 'boolean') return { type: 'boolean', value }
  if (typeof value === 'number') return { type: 'number', value }
  if (typeof value === 'string') {
    if (value === 'true' || value === 'false')
      return { type: 'boolean', value: value === 'true' }
    if (value !== '' && /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value))
      return { type: 'number', value: parseFloat(value) }
    return { type: 'string', value }
  }

  throw new Error(`Invalid value provided.`)
}

export { getNaturalType }
