- 如何使用 antd(开发环境)

  - 在 shims-vue.d.ts 中加入（其他包没 d.ts 文件声明的同理）

  ```
  declare module 'ant-design-vue' {
    const antd: any;
    export default antd;
  }
  ```

  - utils/core/components-ant.ts 用来按需引入 antd 组件
  - babel.config.js 要加入

  ```
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
  ```

  - main.ts

  ```
  import '@/utils/core/components-ant.ts';
  ```

- 生产模式使用 antd(减少打包体积),其他包同理

  - vue.config.js 配置 externals，所有包使用 cdn 引入

  ```
  function getExternals() {
  return {
      'ant-design-vue': 'antd',
      xgplayer: 'xgplayer',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'vue-lazyload': 'VueLazyload'
    };
  }

  config.webpack:{
      externals: process.env.NODE_ENV === 'production' ? getExternals() : {}
  }
  ```

  - main.ts

  ```
  // import '@/utils/core/components-ant.ts'; // dev模式开启， prod模式注释
  import antd from 'ant-design-vue'; // prod模式开启
  Vue.use(antd); // prod模式开启
  ```

  - public/index.html（生产模式要注释 vue-router 的 script 标签外部引用，不然会报错）

  ```
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.1/dist/antd.min.css"
    integrity="sha256-NIZ+iUokooM5YNTdBUe/XDoqD1yp4uhMhvEVMKII54M="
    crossorigin="anonymous"
  />
  <script src="https://cdn.jsdelivr.net/npm/xgplayer@2.9.1/dist/index.min.js"></script>
  ```
