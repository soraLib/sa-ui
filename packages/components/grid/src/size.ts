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
