<template>
  <div class="mb-4">
    <s-resize :initial-size="{ width: 300, height: 300 }" direction="right">
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center"
      >
        resize direction right
      </div>
    </s-resize>
  </div>

  <div style="height: 300px">
    <s-resize
      class="absolute right-0"
      :initial-size="{ width: 300, height: 300 }"
      direction="left"
    >
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center"
      >
        resize direction left
      </div>
    </s-resize>
  </div>
</template>
