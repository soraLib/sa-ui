// For this project development
import '@vue/runtime-core'

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SInput: typeof import('../packages/sa-ui')['SInput']
    SFab: typeof import('../packages/sa-ui')['SFab']
    SGrid: typeof import('../packages/sa-ui')['SGrid']
    SText: typeof import('../packages/sa-ui')['SText']
    SDock: typeof import('../packages/sa-ui')['SDock']
    SDockPanel: typeof import('../packages/sa-ui')['SDockPanel']
    SResize: typeof import('../packages/sa-ui')['SResize']
  }

  // TODO: interface ComponentCustomProperties {}
}

export {}
