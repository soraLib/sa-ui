import type Text from './text.vue'

export const textProps = {
  // TODO: build props util
  modelValue: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
  },
}
export type TextProps = typeof textProps

export type TextInstance = InstanceType<typeof Text>
