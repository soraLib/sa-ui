<template>
  <div ref="dockPanel" class="s-dock-panel" :style="dockStyle">
    <div class="s-dock-panel-header">{{ title }}</div>

    <div class="s-dock-panel-body"><slot /></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { addUnit } from '@sa-ui/utils'
import { dockPanelProps } from './dock-panel'
import type { Position } from '@vueuse/core'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SDockPanel',
})
const props = defineProps(dockPanelProps)

const dockPanel = ref<null | HTMLDivElement>(null)
const dockPanelPosition = ref<Position | { x: undefined; y: undefined }>({
  x: undefined,
  y: undefined,
})

// for test
const backgroundColor = `#${`00000${Math.trunc(
  Math.random() * 0x1000000
).toString(16)}`.slice(-6)}`
const dockStyle = computed<CSSProperties>(() => {
  return props.direction === 'row'
    ? {
        backgroundColor,
        position: 'fixed',
        touchAction: 'none',
        userSelect: 'none',
        left: addUnit(dockPanelPosition.value.x),
        top: addUnit(dockPanelPosition.value.y),
      }
    : {}
})

const onMove = (position: Position) => {
  dockPanelPosition.value.x = position.x
  dockPanelPosition.value.y = position.y
}

useDraggable(dockPanel, { onMove })
</script>

<style lang="scss" scoped>
.s-dock-panel {
  display: block;
}
</style>
