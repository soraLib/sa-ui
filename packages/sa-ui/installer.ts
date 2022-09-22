import { makeInstaller } from './make-installer'
import { components } from './components'

export const installer = makeInstaller([...components])
