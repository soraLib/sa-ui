import { isObject } from '@vue/shared'
import { buildProps, definePropType } from '@sa-ui/utils'
import type { ElementSize } from '@vueuse/core'
import type { Arrayable } from '@sa-ui/utils'
import type Resize from './resize.vue'

export type ResizeSize = Partial<ElementSize>
export type ResizeDirection = 'left' | 'top' | 'right' | 'bottom'
export const resizeProps = buildProps({
  direction: {
    type: definePropType<Arrayable<ResizeDirection>>(String),
    required: true,
  },
  initialSize: {
    type: definePropType<ResizeSize>(Object),
    required: true,
  },
  // TODO: minSize: {}
  // TODO: maxSize: {}
} as const)

export const resizeEmits = {
  resizing: (size: Partial<ElementSize>) => isObject(size),
}

export type ResizeProps = typeof resizeProps
export type ResizeEmits = typeof resizeEmits

export type ResizeInstance = InstanceType<typeof Resize>
