import { definePropType } from '@sa-ui/utils'

export type FabPosition = {
  x: number
  y: number
}

export const fabProps = {
  // TODO: build props util
  initialPosition: {
    type: definePropType<FabPosition>(Object),
    required: false,
  },
}
export type FabProps = typeof fabProps
