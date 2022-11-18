<template>
  <div class="s-grid" :class="[{ 'is-disabled': disabled }]">
    <div
      v-for="(row, ri) in groups"
      :key="ri"
      class="s-grid-row"
      :style="gridRowStyle"
    >
      <Component
        :is="cell"
        v-for="(cell, ci) in row"
        :key="`${row.length}-${ci}`"
        :style="cellStyle(ri)"
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

const groups = computed(() =>
  group(vnodes.value as VNodeChild[], realSize.value[1])
)

const cellStyle = (row: number): CSSProperties =>
  props.disabled
    ? {}
    : {
        width: addUnit(
          100 /
            (row === groups.value.length - 1
              ? realReminder.value
              : realSize.value[1]),
          '%'
        ),
        height: addUnit(100, '%'),
      }

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

.is-disabled {
  .s-grid-row {
    display: block;
  }
}
</style>
