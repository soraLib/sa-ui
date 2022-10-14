// For this project development
import '@vue/runtime-core'
import SFab from '../packages/components/fab/index';

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SInput: typeof import('../packages/sa-ui')['SInput']
    SFab: typeof import('../packages/sa-ui')['SFab']
  }

  interface ComponentCustomProperties {

  }
}

export {}
