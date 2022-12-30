<template>
  <div class="s-dock">
    <slot name="workspace" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SDock',
})
// defineProps(dockProps)
</script>

<style lang="scss" scoped>
.s-dock {
  display: block;
  position: relative;
}
</style>
