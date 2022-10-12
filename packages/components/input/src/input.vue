<template>
  <div>
    <span v-if="$slots.prefix" class="s-input__prefix">
      <slot name="prefix" />
    </span>

    <input
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
import { UPDATE_EVENT, FOCUS_EVENT, BLUR_EVENT, CHANGE_EVENT } from '@sa-ui/constants';
import { inputEmits, inputProps } from './input';

defineOptions({
  name: 'SInput',
})

defineProps(inputProps)
const emit = defineEmits(inputEmits)

type TargetElement = HTMLInputElement | HTMLTextAreaElement
const handleInput = (event: Event) => {
  let { value } = event.target as TargetElement
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