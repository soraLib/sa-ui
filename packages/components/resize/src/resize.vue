<template>
  <div ref="resizeRef" class="s-resize" :style="resizeStyle">
    <div
      v-if="leftResizable"
      ref="leftStickRef"
      class="s-resize__stick is-left"
    />
    <div v-if="topResizable" ref="topStickRef" class="s-resize__stick is-top" />

    <slot />

    <div
      v-if="rightResizable"
      ref="rightStickRef"
      class="s-resize__stick is-right"
    />
    <div
      v-if="bottomResizable"
      ref="bottomStickRef"
      class="s-resize__stick is-bottom"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { isString } from '@vue/shared'
import { addUnit } from '@sa-ui/utils'
import { resizeEmits, resizeProps } from './resize'
import { useStickResize } from './use-resize'
import type { ResizeDirection } from './resize'
import type { OnResizingFn } from './use-resize'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'SResize',
})

const props = defineProps(resizeProps)
const emit = defineEmits(resizeEmits)

const leftResizable = ref(false)
const topResizable = ref(false)
const rightResizable = ref(false)
const bottomResizable = ref(false)

const updateResizable = (direction: ResizeDirection, enabled = true) => {
  if (direction === 'left') {
    leftResizable.value = enabled
  } else if (direction === 'top') {
    topResizable.value = enabled
  } else if (direction === 'right') {
    rightResizable.value = enabled
  } else {
    bottomResizable.value = enabled
  }
}
const reset = () => {
  leftResizable.value = false
  topResizable.value = false
  rightResizable.value = false
  bottomResizable.value = false
}
const initResizable = () => {
  if (isString(props.direction)) {
    updateResizable(props.direction)
  } else {
    props.direction?.forEach((d) => updateResizable(d, true))
  }
}
initResizable()
watch(
  () => props.direction,
  () => {
    reset()
    initResizable()
  }
)

const resizeRef = ref<HTMLDivElement>()
const leftStickRef = ref<HTMLDivElement>()
const topStickRef = ref<HTMLDivElement>()
const rightStickRef = ref<HTMLDivElement>()
const bottomStickRef = ref<HTMLDivElement>()

const realSize = ref(props.initialSize ?? {})
const resizeStyle = computed(() => {
  const basic: CSSProperties = {}

  if (realSize.value?.width)
    Object.assign(basic, { width: addUnit(realSize.value.width) })
  if (realSize.value?.height)
    Object.assign(basic, { height: addUnit(realSize.value.height) })

  return basic
})

const onResizing: OnResizingFn = ({ width, height }) => {
  if (width) realSize.value.width = width
  if (height) realSize.value.height = height
  emit('resizing', { width, height })
}

useStickResize(leftStickRef, {
  direction: 'left',
  origin: realSize,
  onResizing,
})
useStickResize(rightStickRef, {
  direction: 'right',
  origin: realSize,
  onResizing,
})
useStickResize(topStickRef, {
  direction: 'top',
  origin: realSize,
  onResizing,
})
useStickResize(bottomStickRef, {
  direction: 'bottom',
  origin: realSize,
  onResizing,
})
</script>
