<template>
  <s-dock class="bg-gray-400 dock-wrapper">
    <s-dock-panel title="pane-A" direction="row">Pane A Content</s-dock-panel>
    <s-dock-panel title="pane-B" direction="row">Pane B Content</s-dock-panel>

    <template #workspace> workspace </template>
  </s-dock>
</template>

<style lang="scss" scoped>
.dock-wrapper {
  height: 400px;
}
</style>
