import { computed, provide, reactive, ref, useSlots } from 'vue'
import { valuesOf } from '@sa-ui/utils'
import { dockRootContextKey } from './dock'
import type { DockPanelProps, DockState } from './dock-panel'
import type { ElementSize } from '@vueuse/core'
import type {
  DockDirection,
  DockEmits,
  DockPanelContext,
  DockProps,
} from './dock'
import type { ComputedRef, Ref, SetupContext } from 'vue'

export type PanelState = {
  name: string
  // position: Position
  size: ElementSize
  collapsed: boolean
  // nested parent panel id
  nested: number | undefined
  direction: DockDirection
  dock: DockState
  isDragging: boolean
  isGluing: boolean
}
// panel name -> panel state
export type PanelStates = Record<string, Ref<PanelState>>

export const useDock = (
  props: DockProps,
  emit: SetupContext<DockEmits>['emit']
): {
  root: Ref<HTMLDivElement | undefined>
  panels: ComputedRef<DockPanelContext[]>
} => {
  const root = ref<HTMLDivElement>()
  const slots = useSlots()

  const panelSlots = computed(() => slots.default?.() ?? [])
  const panels = computed(() =>
    panelSlots.value.map((slot): DockPanelContext => {
      const props = slot.props as DockPanelProps

      return {
        slot,
        props,
        style: usePanelStyle(props),
        clazz: [],
      }
    })
  )
  const usePanelStyle = (props: DockPanelProps) => {
    if (props.workspace)
      return {
        flexGrow: 1,
      }

    return {}
  }

  const states: PanelStates = reactive({})
  const registerPanel = (state: Ref<PanelState>) => {
    states[state.value.name] = state
  }
  const unregisterPanel = (name: string) => {
    delete states[name]
  }
  const isDragging = computed(() =>
    valuesOf(states).some((state) => state.isDragging)
  )
  const isGluing = computed(() =>
    valuesOf(states).some((state) => state.isGluing)
  )

  provide(dockRootContextKey, {
    root,
    states,
    isDragging,
    isGluing,
    registerPanel,
    unregisterPanel,
  })

  return {
    root,
    panels,
  }
}
