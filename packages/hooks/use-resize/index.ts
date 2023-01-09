import { ref, watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import type { MaybeElementRef } from '@vueuse/core'
import type { Arrayable } from '@sa-ui/utils'

export type ResizePosition = 'left' | 'top' | 'right' | 'bottom'
export const useResize = (
  target: MaybeElementRef,
  positon: Arrayable<ResizePosition> = ['left', 'right', 'bottom', 'top']
) => {
  const elementWidth = ref(0)
  const elementHeight = ref(0)
  const isResizing = ref(false)

  const stop = watch(
    () => target,
    () => {
      const el = unrefElement(target)
      if (!el) return

      const { left, top, width, height } = el.getBoundingClientRect()

      elementHeight.value = height
      elementWidth.value = width
    },
    { immediate: true }
  )
}
