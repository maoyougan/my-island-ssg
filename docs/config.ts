import { defineConfig } from "../dist";
export default defineConfig({
  title: 'defineConfig test',
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link:'/guide/'}
    ],
    sidebar:{
      '/guide/': [
        {
          text: '教程',
          items: [
            {
              text: '快速上手',
              link: '/guide/a'
            },
            {
              text: '如何安装',
              link: '/guide/c'
            }
          ]
        }
      ]
    }
  }
})