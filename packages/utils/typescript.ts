export type Arrayable<T> = T | T[]
export type Awaitable<T> = Promise<T> | T

export type RepeatedTuple<
  A,
  Count extends number,
  Holder extends A[] = []
> = Holder['length'] extends Count
  ? Holder
  : RepeatedTuple<A, Count, [...Holder, A]>
