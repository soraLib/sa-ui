<template>
  <div class="mb-4">
    Width: {{ width }} Min: 200 Max: 600
    <s-resize v-model:width="width" :min="200" :max="600" direction="right">
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center h-28"
      >
        resize direction right
      </div>
    </s-resize>
  </div>

  <div class="mb-4">
    Height: {{ height }} Min: 100 Max: 400
    <s-resize v-model:height="height" :min="100" :max="400" direction="bottom">
      <div
        class="bg-light-50 h-full dark:bg-dark-50 flex items-center justify-center"
      >
        resize direction bottom
      </div>
    </s-resize>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const width = ref(300)
const height = ref(200)
</script>
