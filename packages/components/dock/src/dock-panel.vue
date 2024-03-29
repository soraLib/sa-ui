<template>
  <SResize
    :direction="resizeDirection"
    :initial-size="{ height: panel.size.height, width: panel.size.width }"
    :style="dockStyle"
    @resizing="handleResizing"
  >
    <div
      ref="dockPanel"
      :class="[
        's-dock-panel',
        {
          'is-draggable': !workspace,
          'is-dragging': isDragging,
          'is-gluing': isGluing,
        },
      ]"
    >
      <div
        v-if="isDocked && !isAfterWorkspace"
        ref="glueBefore"
        :class="[
          's-dock-panel__glue',
          'is-before',
          {
            'is-gluing': isGlueBeforeGluing,
          },
        ]"
      />
      <div class="s-dock-panel__inner">
        <div v-if="!workspace" class="s-dock-panel__header">{{ name }}</div>

        <div class="s-dock-panel__body">
          <slot />
        </div>
      </div>
      <div
        v-if="isDocked && !isBeforeWorkspace"
        ref="glueAfter"
        :class="[
          's-dock-panel__glue',
          'is-after',
          {
            'is-gluing': isGlueAfterGluing,
          },
        ]"
      />
    </div>
  </SResize>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useDraggable, useMouseInElement } from '@vueuse/core'
import { isNumber } from 'lodash-unified'
import { SResize, dockRootContextKey } from '@sa-ui/components'
import { addUnit, move, throwError } from '@sa-ui/utils'
import { dockPanelProps } from './dock-panel'
import type { DockPanelContext } from './dock'
import type { PanelState, ResizeDirection, ResizeSize } from '@sa-ui/components'
import type { Position } from '@vueuse/core'
import type { CSSProperties } from 'vue'

const COMPONENT_NAME = 'SDockPanel'
defineOptions({
  name: COMPONENT_NAME,
})
const props = defineProps(dockPanelProps)

const dockRoot = inject(dockRootContextKey)
if (!dockRoot)
  throwError(COMPONENT_NAME, 'usage: <s-dock><s-dock-panel /></s-dock/>')

const panel = ref<PanelState>({
  dock: 'docked',
  name: props.name,
  size: { width: 100, height: 400 },
  collapsed: false,
  nested: undefined,
  direction: 'row',
  isDragging: false,
  isGluing: false,
})
dockRoot.registerPanel(panel.value)

const glueBefore = ref<HTMLDivElement>()
const glueAfter = ref<HTMLDivElement>()
const dockPanel = ref<HTMLDivElement>()
const dockPanelPosition = ref<Position | { x: undefined; y: undefined }>({
  x: undefined,
  y: undefined,
})

const isBeforeWorkspace = computed(() => {
  if (!dockRoot.orderedPanels.value) return true
  const current = dockRoot.orderedDockedPanels.value.findIndex(
    (p) => p.props.name === props.name
  )

  return dockRoot.orderedDockedPanels.value[current + 1]?.props.workspace
})
const isAfterWorkspace = computed(() => {
  if (!dockRoot.orderedPanels.value) return true

  const current = dockRoot.orderedDockedPanels.value.findIndex(
    (p) => p.props.name === props.name
  )
  return dockRoot.orderedDockedPanels.value[current - 1]?.props.workspace
})
// Resize
const resizeDirection = computed<ResizeDirection>(() => {
  return dockRoot.orderedDockedPanels.value.find(
    (panel) => panel.props.name === props.name || panel.props.workspace
  )!.props.workspace
    ? 'left'
    : 'right'
})
const handleResizing = ({ width, height }: ResizeSize) => {
  if (isNumber(width)) panel.value.size.width = width
  if (isNumber(height)) panel.value.size.height = height
}

const isDocked = computed(() => panel.value.dock === 'docked')
const isGluing = computed(() => dockRoot.isGluing.value && isDragging.value)
const { isOutside: isGlueBeforeOutside } = useMouseInElement(glueBefore)
const { isOutside: isGlueAfterOutside } = useMouseInElement(glueAfter)

const isGlueBeforeGluing = computed(
  () => dockRoot.isDragging.value && !isGlueBeforeOutside.value
)
const isGlueAfterGluing = computed(
  () => dockRoot.isDragging.value && !isGlueAfterOutside.value
)
watch([isGlueBeforeGluing, isGlueAfterGluing], ([gb, ga]) => {
  panel.value.isGluing = gb || ga
})

const handleMove = (panels: DockPanelContext[], from: number, to: number) => {
  if (from !== to) {
    const moved = move(panels, from, to)
    dockRoot.order(moved.map((m) => m.props.name))
  }

  dockRoot.lastDragged.value!.dock = 'docked'
}

watch(dockRoot.isDragging, (isDragging) => {
  if (!isDragging) {
    if (isGlueBeforeOutside.value && isGlueAfterOutside.value) return

    const dragged = dockRoot.lastDragged.value!
    const copyPanels = [...dockRoot.orderedPanels.value]
    const from = copyPanels.findIndex((p) => p.props.name === dragged.name)
    let to = copyPanels.findIndex((p) => p.props.name === props.name)

    if (!isGlueBeforeOutside.value && to >= from) to -= 1
    if (!isGlueAfterOutside.value && to <= from) to += 1

    handleMove(copyPanels, from, to)
  }
})

// FIXME: for test
const backgroundColor = `#${`00000${Math.trunc(
  Math.random() * 0x1000000
).toString(16)}`.slice(-6)}`
const dockStyle = computed(() => {
  const styles: CSSProperties = {
    backgroundColor,
    minWidth: props.workspace ? 0 : addUnit(panel.value.size.width),
  }

  if (panel.value.dock === 'floating')
    Object.assign(styles, {
      position: 'fixed',
      touchAction: 'none',
      userSelect: 'none',
      left: addUnit(dockPanelPosition.value.x),
      top: addUnit(dockPanelPosition.value.y),
      zIndex: 2,
    })

  return styles
})

const onMove = (position: Position) => {
  if (props.workspace) return

  dockPanelPosition.value.x = position.x
  dockPanelPosition.value.y = position.y

  panel.value.dock = 'floating'
  panel.value.isDragging = true
}
const onEnd = () => {
  panel.value.isDragging = false
}

const { isDragging } = useDraggable(dockPanel, { onMove, onEnd })

onMounted(() => {
  panel.value.size = {
    width: dockPanel.value?.offsetWidth ?? 0,
    height: dockPanel.value?.offsetHeight ?? 0,
  }
})
onUnmounted(() => dockRoot.unregisterPanel(props.name))
</script>
