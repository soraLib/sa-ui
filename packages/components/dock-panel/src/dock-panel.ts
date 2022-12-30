import { definePropType } from '@sa-ui/utils'

export type DockPanelDirection = 'row' | 'column'
// http://ps.bndh.gob.do/ProSourceFrontOffice/Documents/WebHelp/user_tasks/Docking_and_undocking_windows.htm
export type DockState = 'nested-docked' | 'docked' | 'side-docked' | 'floating'

export const dockPanelProps = {
  // TODO: build props util
  title: {
    type: String,
    required: true,
  },
  direction: {
    type: definePropType<DockPanelDirection>(String),
    required: true,
  },
  nestable: {
    type: Boolean,
    default: true,
  },
}
export type DockPanelProps = typeof dockPanelProps
