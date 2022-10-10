<template>
  <s-input v-model="input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('default')
</script>