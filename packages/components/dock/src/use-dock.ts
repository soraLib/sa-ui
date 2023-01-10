import { computed, provide, ref, useSlots, watch } from 'vue'
import { orderBy } from '@sa-ui/utils'
import { dockRootContextKey } from './dock'
import type { DockPanelProps } from './dock-panel'
import type {
  DockEmits,
  DockPanelContext,
  DockProps,
  PanelState,
} from '@sa-ui/components'
import type { ComputedRef, Ref, SetupContext } from 'vue'

const usePanelStyle = (props: DockPanelProps) => {
  if (props.workspace)
    return {
      flexGrow: 1,
    }

  return {}
}

export const useDock = (
  props: DockProps,
  emit: SetupContext<DockEmits>['emit']
): {
  root: Ref<HTMLDivElement | undefined>
  panels: Ref<DockPanelContext[]>
  orderedPanels: ComputedRef<DockPanelContext[]>
} => {
  const root = ref<HTMLDivElement>()
  const slots = useSlots()

  const panelSlots = slots.default?.() ?? []
  const panels = ref<DockPanelContext[]>(
    panelSlots.map((slot): DockPanelContext => {
      const props = slot.props as DockPanelProps

      return {
        slot,
        props,
        style: usePanelStyle(props),
        clazz: [],
        state: null,
      }
    })
  )
  const panelorders = ref<string[]>()
  const order = (orders: string[]) => {
    panelorders.value = orders
  }

  const orderedPanels = computed(() => {
    if (!panelorders.value) return panels.value

    return orderBy(panels.value, ['props', 'name'], panelorders.value)
  })
  const orderedDockedPanels = computed(() =>
    orderedPanels.value.filter((panel) => {
      return panel.state?.dock !== 'floating'
    })
  )

  const registerPanel = (state: PanelState) => {
    panels.value.find((panel) => panel.props.name === state.name)!.state = state
  }
  const unregisterPanel = (name: string) => {
    panels.value.find((panel) => panel.props.name === name)!.state = null
  }
  const isDragging = computed(() =>
    panels.value.some((panel) => panel.state?.isDragging)
  )
  const isGluing = computed(() =>
    panels.value.some((panel) => panel.state?.isGluing)
  )

  const lastDragged = ref<PanelState>()
  watch(isDragging, (isDragging) => {
    if (isDragging)
      lastDragged.value =
        panels.value.find((panel) => panel.state?.isDragging)?.state ??
        undefined
  })

  provide(dockRootContextKey, {
    root,
    panels,
    orderedPanels,
    orderedDockedPanels,
    isDragging,
    isGluing,
    lastDragged,
    registerPanel,
    unregisterPanel,
    order,
  })

  return {
    root,
    panels,
    orderedPanels,
  }
}
