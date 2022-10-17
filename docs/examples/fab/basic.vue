<template>
  <div>
    Check the floating boxes

    <s-fab class="px-1 py-2 z-999 text-center bg-light-50 dark:bg-dark-50" :style="{ border: '1px solid green' }">
      <div class="w-36">Float Action Box</div>
      <template #side><div>Side Box</div></template>
    </s-fab>
  </div>
</template>
