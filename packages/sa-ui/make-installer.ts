import { INSTALLED_KEY } from '@sa-ui/constants'
import type { App, Plugin } from '@vue/runtime-core'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: {}/* TODO: provide */) => {
    // @ts-ignore
    if (app[INSTALLED_KEY]) return
    // @ts-ignore
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))
  }

  return {
    /* version */
    install,
  }
}
