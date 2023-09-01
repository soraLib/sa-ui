import { isObject } from '@vue/shared'
import { isNumber } from 'lodash-unified'
import { buildProps, definePropType } from '@sa-ui/utils'
import type { ElementSize, MaybeRef } from '@vueuse/core'
import type { Arrayable } from '@sa-ui/utils'
import type Resize from './resize.vue'

export type ResizeSize = Partial<ElementSize>
export type ResizeDirection = 'left' | 'top' | 'right' | 'bottom'
export const resizeProps = buildProps({
  direction: {
    type: definePropType<Arrayable<ResizeDirection>>(String),
    required: true,
  },
  width: {
    type: definePropType<MaybeRef<number>>(Number),
  },
  height: {
    type: definePropType<MaybeRef<number>>(Number),
  },
  min: {
    type: definePropType<number>(Number),
  },
  max: {
    type: definePropType<number>(Number),
  },
} as const)

export const resizeEmits = {
  resizing: (size: Partial<ElementSize>) => isObject(size),
  'update:width': (width: number) => isNumber(width),
  'update:height': (height: number) => isNumber(height),
}

export type ResizeProps = typeof resizeProps
export type ResizeEmits = typeof resizeEmits

export type ResizeInstance = InstanceType<typeof Resize>
