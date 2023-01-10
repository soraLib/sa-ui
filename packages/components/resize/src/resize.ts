import { buildProps, definePropType } from '@sa-ui/utils'
import type { ElementSize } from '@vueuse/core'
import type { Arrayable } from '@sa-ui/utils'
import type Resize from './resize.vue'

export type ResizeInitialSize = Partial<ElementSize>
export type ResizeDirection = 'left' | 'top' | 'right' | 'bottom'
export const resizeProps = buildProps({
  direction: {
    type: definePropType<Arrayable<ResizeDirection>>(String),
    required: true,
  },
  initialSize: {
    type: definePropType<ResizeInitialSize>(Object),
    required: true,
  },
} as const)
export type ResizeProps = typeof resizeProps

export type ResizeInstance = InstanceType<typeof Resize>
