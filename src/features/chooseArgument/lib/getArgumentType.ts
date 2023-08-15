import { getNaturalType } from '@/shared/lib/getNaturalType'

const getArgumentType = (
  argument: boolean | number | string,
  isOutput: boolean
): 'boolean' | 'number' | 'string' => {
  const type = typeof argument
  if (
    isOutput &&
    (type === 'boolean' || type === 'number' || type === 'string')
  ) {
    return type
  }

  return getNaturalType(argument).type
}

export { getArgumentType }
