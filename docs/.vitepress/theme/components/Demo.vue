<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { computed } from 'vue'

import Example from './Example.vue'
import Source from './Source.vue'

const props = defineProps<{
  demos: any
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const formatPathDemos = computed(() => {
  const demos: any = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../examples/', '').replace('.vue', '')] =
      props.demos[key].default
  })

  return demos
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

const [sourceVisible, toggleSourceVisible] = useToggle()
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />

    <div class="example" v-if="formatPathDemos[path]">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <div class="tools">
        <button @click="toggleSourceVisible()">
          {{ sourceVisible ? 'hide' : 'view' }} source
        </button>
      </div>

      <Source v-show="sourceVisible" :source="source" :rawSource="rawSource" /> <!-- TODO: copy source code -->

      <!-- TODO: playground -->
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--border-color);

  .tools {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
  }
}
</style>
