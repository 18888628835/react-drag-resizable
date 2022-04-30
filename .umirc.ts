import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'react-drag-resizable',
  favicon: '/public/lightbulb.png',
  logo: '/public/lightbulb.png',
  outputPath: 'docs-dist',
  alias: {
    src: './src',
  },
  publicPath: '/public/',
  apiParser: {
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: [],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: false,
    },
  },
  // more config: https://d.umijs.org/config
});
