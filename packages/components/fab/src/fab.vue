<template>
  <div tabindex="0" class="s-fab" ref="fab" :style="fabStyle">
    <div v-show="!atSide">
      <slot></slot>
    </div>

    <div v-show="atSide">
      <slot name="side"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, CSSProperties } from 'vue';
import { Position, useDraggable, useElementSize, useWindowSize } from '@vueuse/core'
import { between, addUnit, isNullish } from '@sa-ui/utils'
import { fabProps } from './fab'

defineOptions({
  name: 'SFab',
})
const props = defineProps(fabProps)

const atLeft = ref(false)
const atRight = ref(false)
const atSide = computed(() => atLeft.value || atRight.value)

const fab = ref<null | HTMLDivElement>(null)
const fabPosition = ref(props.initialPosition ?? { x: undefined, y: undefined })
const fabStyle = computed(() => {
  const style: CSSProperties = {
    position: 'fixed',
    touchAction: 'none',
    userSelect: 'none',
    top: addUnit(fabPosition.value.y),
  }

  if(atRight.value) 
    return {
      ...style,
      right: 0,
    }

  if(atLeft.value) 
    return {
      ...style,
      left: 0,
    }

  return {
    ...style,
    left: addUnit(fabPosition.value.x),
  }
})

const fabMaxXPosition = computed(() => windowSize.width.value - fabSize.width.value)

const clearAtSide = () => {
  atLeft.value = false
  atRight.value = false
}

const windowSize = useWindowSize({})
const fabSize = useElementSize(fab)
const onEnd = (position: Position) => {
  if (!fab.value || isNullish(fabPosition.value.x)) return

  if (between(fabPosition.value.x, 0, fabMaxXPosition.value)) {
    clearAtSide()
    // TODO: adds change atEdge status threshold and animations
    return
  }

  if (position.x > fabMaxXPosition.value) {
    atRight.value = true
    fabPosition.value.x = fabMaxXPosition.value
  } else if (position.x < 0) {
    atLeft.value = true
    fabPosition.value.x = 0
  }
}
const onMove = (position: Position) => {
  fabPosition.value.x = position.x
  fabPosition.value.y = position.y

  // limits the box to always be inside the window.
  if (position.y <= -fabSize.height.value) {
    fabPosition.value.y = 0
  } else if (position.y >= windowSize.height.value) {
    fabPosition.value.y = windowSize.height.value - fabSize.height.value
  }

  clearAtSide()
}

useDraggable(fab, {
  initialValue: props.initialPosition,
  onMove,
  onEnd,
})
</script> 

<style lang="scss" scoped>
.s-fab {
  display: block;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 2px solid green;
  }
}
</style>