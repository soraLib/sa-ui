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

  <div class="mb-4">
    <s-resize
      class="ml-auto"
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

  <div class="mb-4">
    <s-resize :initial-size="{ height: 100 }" direction="bottom">
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center"
      >
        resize direction bottom
      </div>
    </s-resize>
  </div>

  <div>
    <s-resize :initial-size="{ height: 100 }" direction="top">
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center"
      >
        resize direction top
      </div>
    </s-resize>
  </div>
</template>
