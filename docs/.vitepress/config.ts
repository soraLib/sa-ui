import type { UserConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'

const Guide = [
  {
    text: 'Getting Started',
    link: '/guide/',
  },
  {
    text: 'FAQ',
    link: '/guide/faq',
  },
  {
    text: 'Component',
    link: '/component/input'
  }
]

const slidebars = [
  {
    text: 'Guide',
    children: Guide.map((e) => {
      (e as any).useLinkText = `${e.text} | Guide`
      return e
    }),
  },
]

const config: UserConfig = {
  title: 'Sa UI',
  description: 'a Vue 3 based component library.',
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
    ],
    sidebar: {
      'guide/': slidebars,
      '/': slidebars,
    },
  },

  markdown: {
    config: mdPlugin,
  },
}

export default config
