import { defineConfig, DefaultTheme } from 'vitepress'
import fastGlob from 'fast-glob'
import { capitalCase } from 'change-case'

const files = fastGlob.sync('packages/*/docs/*.md')
let sidebarItems: DefaultTheme.SidebarItem[] = []

files.forEach(file => {
  const link = file
  const linkSplit = file.split('/')
  const sidebarParentName = linkSplit[0]
  const subName = linkSplit[1]

  let parentIndex = sidebarItems.findIndex(item => item.text === capitalCase(sidebarParentName))
  if(parentIndex === -1) {
    sidebarItems.push({
      text: capitalCase(sidebarParentName),
      items: []
    })
    parentIndex = sidebarItems.length - 1
  }

  let subIndex = sidebarItems?.[parentIndex]?.items.findIndex(item => {
    return item.text === capitalCase(subName)
  })

  if(subIndex === -1) {
    sidebarItems[parentIndex].items.push({
      text: capitalCase(subName),
      collapsed: false,
      items: []
    })
    subIndex = sidebarItems[parentIndex].items.length - 1
  }


  const text = capitalCase(
    linkSplit[linkSplit.length - 1].replace('.md', '')
  )

  sidebarItems[parentIndex].items?.[subIndex]?.items.push({
    text,
    link: link.replace('packages', '').replace('docs', '')
  })
})

console.log(JSON.stringify(sidebarItems, undefined, 2))

export default defineConfig({
  title: 'Augment Quasar',
  rewrites: {
    ':docs/:page': ':page',
    'packages/:packageKebab/docs/:docName': ':packageKebab/:docName'
  },
  themeConfig: {
    
    sidebar: [
      {
        link: 'getting-started',
        text: 'Getting Started...'
      },
      ...sidebarItems
    ],
  },
})