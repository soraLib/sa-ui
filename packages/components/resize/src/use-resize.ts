import { unrefElement, useEventListener } from '@vueuse/core'
import type { ResizeDirection } from './resize'
import type { Ref } from 'vue'
import type { ElementSize, MaybeRef } from '@vueuse/core'

export type OnResizingFn = (size: { width?: number; height?: number }) => void
export const useStickResize = (
  target: MaybeRef<HTMLElement | undefined>,
  options: {
    direction: ResizeDirection
    origin: Ref<Partial<ElementSize>>
    onResizing: OnResizingFn
  }
) => {
  useEventListener(target, 'mousedown', (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    useStickResizing(unrefElement(target)!, {
      ...options,
      event,
    })
  })
}

const useStickResizing = (
  target: HTMLElement,
  options: {
    direction: ResizeDirection
    origin: Ref<Partial<ElementSize>>
    onResizing: OnResizingFn
    event: MouseEvent
  }
) => {
  // stick origin data
  const origin = {
    width: options.origin.value.width,
    height: options.origin.value.height,
    mouseX: options.event.screenX,
    mouseY: options.event.screenY,
  }

  const limitWidth = (to: number): number => {
    if (to <= 0) return 0
    return to
  }

  const stickMove = (event: MouseEvent) => {
    document.body.style.cursor = 'ew-resize' // FIXME: nw
    const deltaX =
      (options.direction === 'right' ? 1 : -1) * (event.screenX - origin.mouseX)
    const deltaY = event.screenY - origin.mouseY
    // TODO: vertical

    options.onResizing({
      width: limitWidth(origin.width! + deltaX),
      // height: origin.height + deltaY,
    })
  }
  const addStickMoveListener = () => {
    document.documentElement.addEventListener('mousemove', stickMove)
    document.documentElement.addEventListener('mouseup', stickUp)
    document.documentElement.addEventListener('mouseleave', stickUp)
  }
  const removeStickMoveListener = () => {
    document.body.style.cursor = 'default'
    document.documentElement.removeEventListener('mousemove', stickMove)
    document.documentElement.removeEventListener('mouseup', stickUp)
    document.documentElement.removeEventListener('mouseleave', stickUp)
  }
  const stickUp = removeStickMoveListener

  addStickMoveListener()
}
