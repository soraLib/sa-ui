import type Input from './input.vue'

export const inputProps = {
  // TODO: build props util
 modelValue: {
    type: [
      String,
      Number,
    ],
    default: '',
 }
}

export type InputProps = typeof inputProps

export const inputEmits = {
  'update:modelValue': (value: string) => value
}
export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>