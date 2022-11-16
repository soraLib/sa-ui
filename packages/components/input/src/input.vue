<template>
  <div>
    <span v-if="$slots.prefix" class="s-input__prefix">
      <slot name="prefix" />
    </span>

    <input
      v-bind="attrs"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span v-if="$slots.suffix" class="s-input__suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'
import {
  BLUR_EVENT,
  CHANGE_EVENT,
  FOCUS_EVENT,
  UPDATE_EVENT,
} from '@sa-ui/constants'
import { inputEmits, inputProps } from './input'

defineOptions({
  name: 'SInput',
})

defineProps(inputProps)
const emit = defineEmits(inputEmits)

const attrs = useAttrs()

type TargetElement = HTMLInputElement | HTMLTextAreaElement
const handleInput = (event: Event) => {
  const { value } = event.target as TargetElement
  emit(UPDATE_EVENT, value)
}
const handleChange = (event: Event) => {
  emit(CHANGE_EVENT, (event.target as TargetElement).value)
}
const handleFocus = (event: FocusEvent) => {
  emit(FOCUS_EVENT, event)
}
const handleBlur = (event: FocusEvent) => {
  emit(BLUR_EVENT, event)
}
</script>
