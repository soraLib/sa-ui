<template>
  <div class="s-fab" ref="fab" :style="fabStyle">
    <div tabindex="0" class="s-fab__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, CSSProperties } from 'vue';
import { useDraggable } from '@vueuse/core'

defineOptions({
  name: 'SFab',
})

const fab = ref<null | HTMLDivElement>(null)
const { x, y } = useDraggable(fab, {
  initialValue: { x: 400, y: 200 },
})
const fabStyle = computed<CSSProperties>(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  position: 'fixed',
  touchAction: 'none',
  userSelect: 'none',
}))
</script> 

<style lang="scss" scoped>
.s-fab__inner {
  border-radius: 4px;
  display: block;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }

  &:focus {
    outline: 2px solid green;
  }
}
</style>