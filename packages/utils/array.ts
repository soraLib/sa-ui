import { get } from 'lodash-unified'
import type { Arrayable, RepeatedTuple } from '@sa-ui/utils'

/**
 * Splits an array into a group of arrays by the count of per group.
 *
 * @example
 *
 * ```ts
 * expect(group([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
 *  [1, 2, 3],
 *  [4, 5, 6],
 *  [7],
 * ])
 * ```
 */
export const group = <T>(list: T[], count: number): T[][] =>
  Array.from({ length: Math.ceil(list.length / count) }).map((_, i) =>
    list.slice(i * count, (i + 1) * count)
  )

/**
 *
 * @example
 *
 * ```ts
 * expect(orderBy([{ id: 1 }, { id: 2 }, { id: 3 }], 'id', [3, 2, 1]))
 *   .toEqual([{ id: 3 }, { id: 2 }, { id: 1 }])
 * ```
 */
export const orderBy = <
  AS extends readonly any[],
  K extends Arrayable<string>,
  R extends any[] /* RepeatedTuple<AS[number][K], AS['length']> */
>(
  as: AS,
  key: K,
  to: R
): AS[number][] => {
  console.log('do sort')

  return [...as].sort((a, b) => {
    const ai = to.indexOf(get(a, key))
    const bi = to.indexOf(get(b, key))

    return ai - bi
  })
}

export const move = <A>(as: A[], from: number, to: number): A[] => {
  as.splice(to, 0, as.splice(from, 1)[0])
  return as
}
