import { withInstall, withNoopInstall } from '@sa-ui/utils'
import Dock from './src/dock.vue'
import DockPanel from './src/dock-panel.vue'

export const SDock = withInstall(Dock, { DockPanel })
export default SDock

export const SDockPanel = withNoopInstall(DockPanel)

export * from './src/dock'
export * from './src/dock-panel'
