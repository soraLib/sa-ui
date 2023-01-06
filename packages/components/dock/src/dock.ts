import { buildProps } from '@sa-ui/utils'
import type {
  CSSProperties,
  ComputedRef,
  ExtractPropTypes,
  InjectionKey,
  Ref,
  UnwrapRef,
  VNode,
} from 'vue'
import type { Arrayable } from '@sa-ui/utils'
import type { DockPanelProps, DockState } from '@sa-ui/components'
import type { ElementSize } from '@vueuse/core'

export type DockDirection = 'row' | 'column'
export const dockProps = buildProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
export const dockEmits = {
  reset: (): void => undefined,
}

export type DockProps = ExtractPropTypes<typeof dockProps>
export type DockEmits = typeof dockEmits

export type DockPanelContext = UnwrapRef<{
  slot: VNode
  props: DockPanelProps
  style: CSSProperties
  clazz: Arrayable<string>
  state: PanelState | null
}>

export type PanelState = {
  name: string
  // TODO: position: Position
  size: ElementSize
  collapsed: boolean
  // TODO: nested parent panel id
  nested: number | undefined
  direction: DockDirection
  dock: DockState
  isDragging: boolean
  isGluing: boolean
}
export type DockRootContext = {
  root: Ref<HTMLElement | undefined>
  panels: Ref<DockPanelContext[]>
  orderedPanels: ComputedRef<DockPanelContext[]>
  orderedDockedPanels: ComputedRef<DockPanelContext[]>
  lastDragged: Ref<PanelState | undefined>
  isDragging: ComputedRef<boolean>
  isGluing: ComputedRef<boolean>
  order: (orders: string[]) => void
  registerPanel: (state: PanelState) => void
  unregisterPanel: (name: string) => void
}

export const dockRootContextKey: InjectionKey<DockRootContext> =
  Symbol('dockRootContextKey')
