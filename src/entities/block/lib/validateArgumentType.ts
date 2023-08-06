import { getNaturalType } from '@/shared/lib/getNaturalType'

const validateArgumentType = (
  value: string,
  validTypes: string[],
  message = 'Argument type mismatch'
) => {
  if (value !== '' && !validTypes.includes(getNaturalType(value))) {
    const hasMultipleTypes = validTypes.length > 1

    throw new Error(
      `${message}. It has type: "${getNaturalType(value)}" but only the type${
        hasMultipleTypes ? 's' : ''
      } "${validTypes.join('" and "')}" ${
        hasMultipleTypes ? 'are' : 'is'
      } valid.`
    )
  }
}

export { validateArgumentType }
