/**
 * Throw an error when the provided value is null.
 *
 * The return value is then guaranteed not to be null.
 */
const assertNotNull = <T>(value: T | null, message = 'Value is null'): T => {
  if (value === null) {
    throw new Error(message)
  }

  return value
}

export { assertNotNull }
