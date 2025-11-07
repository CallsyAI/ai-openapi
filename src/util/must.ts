/**
 * Forces an optional field to be not optional.
 */
export function must<T>(
  value: T | null | undefined,
  fieldName: string,
): T {
  if (value === null || value === undefined) {
    throw new Error(`A field "${fieldName}" must not be empty.`)
  }
  return value
}
