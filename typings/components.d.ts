// For this project development
import '@vue/runtime-core'

// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SInput: typeof import('sa-ui')['SInput']
  }

  interface ComponentCustomProperties {

  }
}

export {}
