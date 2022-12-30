import { mdPlugin } from './config/plugins'
import type { UserConfig } from 'vitepress'

const Guide = [
  {
    text: 'Getting Started',
    link: '/guide/',
  },
  {
    text: 'FAQ',
    link: '/guide/faq',
  },
]

const Components = [
  {
    text: 'Dock',
    link: '/component/dock',
  },
  {
    text: 'Fab',
    link: '/component/fab',
  },
  {
    text: 'Grid',
    link: '/component/grid',
  },
  {
    text: 'Input',
    link: '/component/input',
  },
  {
    text: 'Text',
    link: '/component/text',
  },
]

const slidebars = [
  {
    text: 'Guide',
    children: Guide.map((e) => {
      ;(e as any).useLinkText = `${e.text} | Guide`
      return e
    }),
  },
  {
    text: 'Component',
    children: Components.map((e) => {
      ;(e as any).useLinkText = `${e.text} | Component`
      return e
    }),
  },
]

const config: UserConfig = {
  title: 'Sa UI',
  description: 'a Vue 3 based component library.',
  appearance: false,
  lang: 'en-US',
  base: '/',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'author', content: 'Hfutsora' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    repo: 'soraLib/sa-ui',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Guide',
        items: Guide,
      },
      {
        text: 'Component',
        items: Components,
      },
    ],
    sidebar: {
      'guide/': slidebars,
      'component/': slidebars,
      '/': slidebars,
    },
  },

  markdown: {
    config: mdPlugin,
  },
}

export default config
