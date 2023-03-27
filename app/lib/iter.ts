import invariant from 'tiny-invariant'
import { NaturalNumber, verify, WholeNumber } from './spec'

export function* range(
  start: WholeNumber,
  stop?: WholeNumber,
  step?: WholeNumber,
): IterableIterator<number> {
  if (stop === undefined) {
    stop = start
    start = 0
  }

  if (step === undefined) {
    step = 1
  }

  verify(WholeNumber, start)
  verify(WholeNumber, stop)
  verify(NaturalNumber, step)
  invariant(start <= stop, `start(${start}) must be less than stop(${stop})`)

  for (let i = start; i < stop; i += step) {
    yield i
  }
}

export function map<T, U>(f: (x: T) => U) {
  return function* (arr: Iterable<T>): IterableIterator<U> {
    for (const e of arr) {
      yield f(e)
    }
  }
}

export function filter<T>(pred: (v: T) => boolean) {
  return function* (arr: Iterable<T>): IterableIterator<T> {
    for (const e of arr) {
      if (pred(e)) {
        yield e
      }
    }
  }
}

export function reduce<T, U>(f: (x: T, acc: U) => U, init: U) {
  return function (arr: Iterable<T>): U {
    let result = init
    for (const e of arr) {
      result = f(e, result)
    }

    return result
  }
}

export function find<T>(f: (x: T) => boolean) {
  return (arr: Iterable<T>): T | undefined => {
    for (const e of arr) {
      if (f(e)) {
        return e
      }
    }

    return undefined
  }
}

export function findIndex<T>(f: (x: T) => boolean) {
  return (arr: Iterable<T>): number => {
    let i = 0
    for (const e of arr) {
      if (f(e)) {
        return i
      }
      i += 1
    }
    return -1
  }
}

export function every<T>(f: (v: T) => boolean) {
  return (arr: Iterable<T>): boolean => {
    for (const e of arr) {
      if (!f(e)) {
        return false
      }
    }

    return true
  }
}

export function some<T>(f: (v: T) => boolean) {
  return (arr: Iterable<T>): boolean => {
    for (const e of arr) {
      if (f(e)) {
        return true
      }
    }

    return false
  }
}

export function takeWhile<T>(f: (x: T) => boolean) {
  return function* (arr: Iterable<T>): IterableIterator<T> {
    for (const e of arr) {
      if (!f(e)) {
        break
      }

      yield e
    }
  }
}

export function skipWhile<T>(f: (x: T) => boolean) {
  return function* (arr: Iterable<T>): IterableIterator<T> {
    let skip = true
    for (const e of arr) {
      if (skip && f(e)) {
        continue
      }

      skip = false
      yield e
    }
  }
}

export function take<T>(n: number) {
  return function* (arr: Iterable<T>): IterableIterator<T> {
    let i = 0
    for (const e of arr) {
      if (i >= n) {
        break
      }

      yield e
      i += 1
    }
  }
}

export function skip<T>(n: number) {
  return function* (arr: Iterable<T>): IterableIterator<T> {
    let i = 0
    for (const e of arr) {
      if (i < n) {
        i += 1
        continue
      }

      yield e
    }
  }
}

export function concat<T>(...arrs: Array<Iterable<T>>) {
  return function* (): IterableIterator<T> {
    for (const arr of arrs) {
      yield* arr
    }
  }
}

export function enumerate<T>(arr: Iterable<T>) {
  return function* (): IterableIterator<[number, T]> {
    let i = 0
    for (const e of arr) {
      yield [i, e]
      i += 1
    }
  }
}

export function flatMap<T, U>(f: (x: T) => Iterable<U>) {
  return function* (arr: Iterable<T>): IterableIterator<U> {
    for (const e of arr) {
      yield* f(e)
    }
  }
}

export function toArray<T>(arr: Iterable<T>): T[] {
  return [...arr]
}
