import { isString } from '@vue/shared'
import {
  BLUR_EVENT,
  CHANGE_EVENT,
  FOCUS_EVENT,
  UPDATE_EVENT,
} from '@sa-ui/constants'
import type Input from './input.vue'

export const inputProps = {
  // TODO: build props util
  modelValue: {
    type: [String, Number],
    default: '',
  },
}
export type InputProps = typeof inputProps

export const inputEmits = {
  [UPDATE_EVENT]: (val: string) => isString(val),
  [CHANGE_EVENT]: (val: string) => isString(val),
  [FOCUS_EVENT]: (evt: FocusEvent) => evt instanceof FocusEvent,
  [BLUR_EVENT]: (evt: FocusEvent) => evt instanceof FocusEvent,
}
export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>
