export const jstr = (x: unknown): string => JSON.stringify(x, null, 2)

export const tap =
  (prefix?: string) =>
  <T>(x: T): T => {
    // eslint-disable-next-line no-console
    console.log(`tap(${prefix ?? ''}): ${jstr(x)}`)
    return x
  }
