<template>
  <div ref="root" class="s-dock">
    <Component
      :is="panel.slot"
      v-for="panel in orderedPanels"
      :key="panel.props.name"
      :style="panel.style"
      :class="panel.clazz"
    />
  </div>
</template>

<script lang="ts" setup>
import { useDock } from './use-dock'
import { dockEmits, dockProps } from './dock'

defineOptions({
  name: 'SDock',
})
const props = defineProps(dockProps)
const emit = defineEmits(dockEmits)

const { root, orderedPanels } = useDock(props, emit)
</script>

<style lang="scss" scoped>
.s-dock {
  display: flex;
  position: relative;
  height: 400px;
}
</style>
