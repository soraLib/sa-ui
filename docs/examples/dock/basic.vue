<template>
  <s-dock class="bg-gray-400 dock-wrapper">
    <s-dock-panel name="pane-A">Pane A Content</s-dock-panel>
    <s-dock-panel name="pane-B">Pane B Content</s-dock-panel>
    <s-dock-panel :workspace="true" name="workspace"
      >Workspace Content</s-dock-panel
    >
    <s-dock-panel name="pane-c">Pane c Content</s-dock-panel>
  </s-dock>
</template>

<style lang="scss" scoped>
.dock-wrapper {
  height: 400px;
}
</style>
