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
import type { PanelState, PanelStates } from './use-dock'
import type { DockPanelProps } from '@sa-ui/components/dock'

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
}>

export type DockRootContext = {
  root: Ref<HTMLElement | undefined>
  states: PanelStates
  isDragging: ComputedRef<boolean>
  isGluing: ComputedRef<boolean>
  registerPanel: (state: Ref<PanelState>) => void
  unregisterPanel: (name: string) => void
}

export const dockRootContextKey: InjectionKey<DockRootContext> =
  Symbol('dockRootContextKey')
