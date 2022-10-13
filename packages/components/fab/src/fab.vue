<template>
  <div class="s-fab">
    <div tabindex="0" class="s-fab__inner">
      fab
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'SFab',
})
</script>

<style lang="scss" scoped>
.s-fab__inner {
  border-radius: 4px;

  &:focus {
    outline: 2px solid green;
  }
}
</style>