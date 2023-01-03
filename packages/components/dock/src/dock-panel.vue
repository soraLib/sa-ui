<template>
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
    :style="dockStyle"
  >
    <div
      v-if="isDocked"
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

      <div class="s-dock-panel__body"><slot /></div>
    </div>
    <div
      v-if="isDocked"
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
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useDraggable, useMouseInElement } from '@vueuse/core'
import { addUnit, throwError } from '@sa-ui/utils'
import { dockRootContextKey } from '@sa-ui/components'
import { dockPanelProps } from './dock-panel'
import type { PanelState } from './use-dock'
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

watch(
  () => dockRoot.isGluing.value,
  (v) => {
    console.log(v)
  }
)

const glueBefore = ref<null | HTMLDivElement>(null)
const glueAfter = ref<null | HTMLDivElement>(null)
const dockPanel = ref<null | HTMLDivElement>(null)
const dockPanelPosition = ref<Position | { x: undefined; y: undefined }>({
  x: undefined,
  y: undefined,
})

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

// FIXME: for test
const backgroundColor = `#${`00000${Math.trunc(
  Math.random() * 0x1000000
).toString(16)}`.slice(-6)}`
const dockStyle = computed(() => {
  const styles: CSSProperties = { backgroundColor }

  if (panel.value.dock === 'floating')
    Object.assign(styles, {
      position: 'fixed',
      touchAction: 'none',
      userSelect: 'none',
      left: addUnit(dockPanelPosition.value.x),
      top: addUnit(dockPanelPosition.value.y),
      width: addUnit(panel.value.size.width),
      height: addUnit(panel.value.size.height),
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

// const panelName = computed(() => props.name)
const panel = ref<PanelState>({
  dock: 'docked',
  name: props.name,
  size: { width: 0, height: 0 },
  collapsed: false,
  nested: undefined,
  direction: 'row',
  isDragging: false,
  isGluing: false,
})

onMounted(() => {
  panel.value.size = {
    width: dockPanel.value?.offsetWidth ?? 0,
    height: dockPanel.value?.offsetHeight ?? 0,
  }

  dockRoot.registerPanel(panel)
})
onUnmounted(() => dockRoot.unregisterPanel(props.name))
</script>
