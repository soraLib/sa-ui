<template>
  <input
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { inputProps, inputEmits } from './input';

defineOptions({ // TODO: unplugin import
  name: 'SInput',
})

defineProps(inputProps)
const emit = defineEmits(inputEmits)

const handleInput = (event: Event) => {
  let { value } = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', value)
}
</script>