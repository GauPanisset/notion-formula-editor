import { ArgumentType } from './type'

const getArgumentNaturalType = (
  value: boolean | number | string
): ArgumentType => {
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'string') {
    if (value === 'true' || value === 'false') return 'boolean'
    if (value !== '' && /^[0-9]*$/.test(value)) return 'number'
    return 'string'
  }

  throw new Error(`Invalid value provided.`)
}

export { getArgumentNaturalType }
