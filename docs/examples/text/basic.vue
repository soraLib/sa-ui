<template>
  <div>
    Loading Text

    <s-text text="Loading" :loading="loading" />

    <button @click="() => void toggleLoading()">toggle loading</button>
  </div>
</template>

<script lang="ts" setup>
import { useToggle } from '@vueuse/core'

const [loading, toggleLoading] = useToggle()
</script>
