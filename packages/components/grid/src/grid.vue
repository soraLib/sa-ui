<template>
  <div class="s-grid">
    <div
      v-for="(row, ri) in cellGrid"
      :key="ri"
      class="s-grid-row"
      :style="gridRowStyle"
    >
      <Component
        :is="cell.vnode"
        v-for="(cell, ci) in row"
        :key="`${cell.style['width']}-${ci}`"
        :style="cell.style"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { addUnit, group } from '@sa-ui/utils'
import { gridProps } from './grid'
import { calcRealSize } from './size'
import type { CSSProperties, VNodeChild } from 'vue'

defineOptions({
  name: 'SGrid',
})
const props = defineProps(gridProps)

const slots = useSlots()

const defaultSlot = slots.default
const vnodes = computed(() => defaultSlot?.()[0].children ?? []) // TODO: if slot is string

const total = computed(() => vnodes.value.length as number) // TODO: if slot is string
const real = computed(() => calcRealSize(props.size, total.value))
const realSize = computed(() => real.value.size)
const realReminder = computed(() => real.value.remainder)

const gridRowStyle = computed<CSSProperties>(() => ({
  height: addUnit(100 / realSize.value[0], '%'),
}))

const groupedVNodes = computed(() =>
  group(vnodes.value as VNodeChild[], realSize.value[1])
)

type Cell = {
  style: CSSProperties
  vnode: VNodeChild
}

type CellGrid = Cell[][]
const cellGrid = computed<CellGrid>(() =>
  groupedVNodes.value.map((cells, row): Cell[] =>
    cells.map((cell) => ({
      style: {
        width: addUnit(
          100 /
            (row === groupedVNodes.value.length - 1
              ? realReminder.value
              : realSize.value[1]),
          '%'
        ),
        height: addUnit(100, '%'),
      },
      vnode: cell,
    }))
  )
)

// TODO: splits vnodes into pages
// const pages =
</script>

<style lang="scss" scoped>
.s-grid {
  width: 100%;
  height: 100%;

  .s-grid-row {
    display: flex;
  }
}
</style>
