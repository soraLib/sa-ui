import type { GridSize } from './grid'

// TODO: splits into pages
export const calcRealSize = (
  size: GridSize,
  total: number
): {
  size: GridSize
  remainder: number
} => {
  const [, column] = size

  if (total < column)
    return {
      size: [1, total],
      remainder: total,
    }

  const row = Math.floor(total / column)
  const remainder = total % column

  return {
    size: [remainder ? row + 1 : row, column],
    remainder,
  }
}

// TODO: move into utils
export const group = <T>(list: T[], count: number): T[][] => {
  const result: T[][] = []
  for (let i = 0, len = list.length; i < len; i += count) {
    result.push(list.slice(i, i + 3))
  }

  return result
}
