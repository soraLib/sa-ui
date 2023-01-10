import { get, set } from 'lodash-unified'
import type { UnwrapRef } from 'vue'
import type { Entries } from 'type-fest'
import type { Arrayable } from '.'

export const keysOf = <T>(arr: T) => Object.keys(arr as any) as (keyof T)[]
export const entriesOf = <T>(arr: T) => Object.entries(arr as any) as Entries<T>
export const valuesOf = <T>(arr: T) =>
  Object.values(arr as any) as UnwrapRef<T[keyof T]>[]
export { hasOwn } from '@vue/shared'

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue)
    },
    set value(val: any) {
      set(obj, path, val)
    },
  }
}
