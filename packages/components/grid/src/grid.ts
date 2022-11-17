import type { PropType } from 'vue'

/**
 * GridSize = [row, column]
 */
export type GridSize = [number, number]

export const gridProps = {
  // TODO: build props util
  size: {
    required: false,
    type: Object as PropType<GridSize>,
    default: () => [3, 3],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}
export type GridProps = typeof gridProps
