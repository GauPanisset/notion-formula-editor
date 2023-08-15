import { getNaturalType } from '@/shared/lib/getNaturalType'

const validateArgumentType = (
  value: boolean | number | string,
  validTypes: string[],
  message = 'Argument type mismatch'
) => {
  const { type } = getNaturalType(value)
  if (value !== '' && !validTypes.includes(type)) {
    const hasMultipleTypes = validTypes.length > 1

    throw new Error(
      `${message}. It has type: "${type}" but only the type${
        hasMultipleTypes ? 's' : ''
      } "${validTypes.join('" and "')}" ${
        hasMultipleTypes ? 'are' : 'is'
      } valid.`
    )
  }
}

export { validateArgumentType }
