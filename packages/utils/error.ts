class SaError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'SaError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new SaError(`[${scope}] ${m}`)
}
