<template>
  <s-input v-model="input">
    <template #prefix>prefix</template>
    <template #suffix>suffix</template>
  </s-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('default')
</script>