<template>
  <s-grid :style="{ height: '400px' }">
    <div v-for="num in Number(count)" :key="num" class="grid">{{ num }}</div>
  </s-grid>

  grid count <s-input v-model="count" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(5)
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  outline: 1px solid green;
}
</style>
