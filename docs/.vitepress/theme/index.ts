import 'vue-global-api'

import Layout from './Layout.vue'
import NotFound from './NotFound.vue'

import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/sidebar-links.css'
import SaUI from 'sa-ui'

import 'virtual:windi.css'
import { App } from 'vue'

const theme = {
  Layout,
  NotFound,
  enhanceApp: ({ app }: { app: App }) => {
    app.use(SaUI)
  },
}

export default theme
