// For this project development
import '@vue/runtime-core'

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SInput: typeof import('../packages/sa-ui')['SInput']
    SFab: typeof import('../packages/sa-ui')['SFab']
    SGrid: typeof import('../packages/sa-ui')['SGrid']
    SText: typeof import('../packages/sa-ui')['SText']
  }

  // TODO: interface ComponentCustomProperties {}
}

export {}
