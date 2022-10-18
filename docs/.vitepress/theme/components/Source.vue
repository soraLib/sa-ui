<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard, useWebNotification } from '@vueuse/core'

const props = defineProps<{
  source: string
  rawSource: string
}>()

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})

const { copy, isSupported: isCopySupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const copyCode = async () => {
  if (!isCopySupported)
    return useWebNotification({
      title: 'This browser does not support automatic copy!',
    }).show()

  try {
    await copy()
    useWebNotification({
      title: 'Source code has been copied!',
      renotify: true,
      tag: 'copy',
    }).show()
  } catch (e: any) {
    useWebNotification({ title: e }).show()
  }
}
</script>

<template>
  <div class="example-source-wrapper language-vue">
    <div class="example-source" v-html="decoded" />

    <button class="copy" @click="copyCode">copy</button>
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0;
  border-radius: 0;
}

[class*='language-'] {
  > button.copy {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 3;
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    background-color: var(--c-bg);
    color: var(--c-text);
    opacity: 0;
    cursor: pointer;
    background-image: var(--vp-icon-copy);
    background-position: 50%;
    background-size: 20px;
    background-repeat: no-repeat;
    transition: opacity 0.4s;
  }

  &:hover > button.copy {
    opacity: 1;
  }
}
</style>
