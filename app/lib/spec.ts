import invariant from 'tiny-invariant'
import { z } from 'zod'

export const WholeNumber = z.number().int().nonnegative()
export type WholeNumber = z.infer<typeof WholeNumber>

export const Int = z.number().int()
export type Int = z.infer<typeof Int>

export const NaturalNumber = z.number().int().positive()
export type NaturalNumber = z.infer<typeof NaturalNumber>

export function safeCast<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
  msg?: string,
): T | Error {
  const result = schema.safeParse(value)
  return result.success
    ? result.data
    : msg === undefined
    ? new Error(msg)
    : result.error
}

export function cast<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
): z.infer<typeof schema> {
  return schema.parse(value)
}

export function verify<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
): asserts value is z.infer<typeof schema> {
  schema.parse(value)
}

export function verifyArray(arr: unknown[]): asserts arr is unknown[] {
  invariant(Array.isArray(arr), 'Expected an array')
}

export function is<T>(schema: z.ZodSchema<T>, value: unknown): value is T {
  return schema.safeParse(value).success
}

export type Comparable = string | number | Date

export function checked<
  Args extends [] | [z.ZodTypeAny, ...z.ZodTypeAny[]],
  F extends (...args: Array<z.infer<Args[number]>>) => unknown,
>(specs: Args, f: F) {
  return z.function(z.tuple(specs)).implement(f)
}

export function checkedReturn<
  Args extends [] | [z.ZodTypeAny, ...z.ZodTypeAny[]],
  F extends (...args: Array<z.infer<Args[number]>>) => unknown,
  R extends z.ZodTypeAny,
>(specs: Args, ret: R, f: F) {
  return z.function(z.tuple(specs), ret).implement(f)
}

export function isNumber(x: unknown): x is number {
  return is(z.number(), x)
}

export function isInt(x: unknown): x is number {
  return is(z.number().int(), x)
}

export function isString(x: unknown): x is string {
  return is(z.string(), x)
}

export function isDate(x: unknown): x is Date {
  return is(z.date(), x)
}

export function isBoolean(x: unknown): x is boolean {
  return is(z.boolean(), x)
}

export function isNil(x: unknown): x is null | undefined {
  return is(z.null(), x) || is(z.undefined(), x)
}

export function isArray(x: unknown): x is readonly unknown[] {
  return is(z.array(z.unknown()), x)
}

export function isObject(x: unknown): x is Record<string, unknown> {
  return is(z.record(z.any()), x)
}
