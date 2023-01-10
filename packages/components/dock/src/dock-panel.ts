import { buildProps, definePropType } from '@sa-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type DockPanel from './dock-panel.vue'

export type DockPanelDirection = 'row' | 'column'
// http://ps.bndh.gob.do/ProSourceFrontOffice/Documents/WebHelp/user_tasks/Docking_and_undocking_windows.htm
export type DockState = 'nested-docked' | 'docked' | 'side-docked' | 'floating'

export const dockPanelProps = buildProps({
  name: {
    type: String,
    required: true,
  },
  direction: {
    type: definePropType<DockPanelDirection>(String),
    default: 'row',
  },
  nestable: {
    type: Boolean,
    default: true,
  },
  workspace: {
    type: Boolean,
    default: false,
  },
} as const)
export type DockPanelProps = ExtractPropTypes<typeof dockPanelProps>
export type DockPanelInstance = InstanceType<typeof DockPanel>
