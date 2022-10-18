import SaUI from 'sa-ui'
import { define } from '../utils/types'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import type { Theme } from 'vitepress'

import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/sidebar-links.css'

import 'virtual:windi.css'

const theme = define<Theme>({
  Layout,
  NotFound,
  enhanceApp: ({ app }) => {
    app.use(SaUI)
  },
})

export default theme
