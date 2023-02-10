import { defineConfig } from "../dist";
export default defineConfig({
  title: 'defineConfig test',
  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link:'/guide/'}
    ]
  }
})