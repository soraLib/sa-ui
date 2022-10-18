import SaUI from 'sa-ui'
import { define } from '../utils/types'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import type { Theme } from 'vitepress'

// for dev
// reset
// import '../../../packages/theme/src/reset.scss'
import '../../../packages/theme/src/index.scss'
// for dark mode
// import '../../../packages/theme-chalk/src/dark/css-vars.scss'

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
