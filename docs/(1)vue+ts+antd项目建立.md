# vue2.6+typescript+antd1.6.1 开发--项目建立与基本开发

## start

- 安装@vue/cli4
- vue create myproject 选择 typescript
- yarn 安装依赖

## 配置（eslint, prettier, vue.config.js ...）

```javascript
// .eslintrc.js
/**
 * eslint 配置文件，采用的模式是 eslint + prettier
 *
 * @dependency @typescript-eslint/eslint-plugin
 * @dependency @typescript-eslint/parser
 * @dependency @vue/cli-plugin-eslint
 * @dependency @vue/eslint-config-prettier
 * @dependency @vue/eslint-config-typescript
 * @dependency eslint
 * @dependency eslint-plugin-prettier
 * @dependency eslint-plugin-sort-imports-es6-autofix // import 自动排序
 * @dependency eslint-plugin-vue
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['sort-imports-es6-autofix'],
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/prettier',

    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',

    '@vue/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],

    /**
     * Vue 配置规则: https://eslint.vuejs.org/rules/
     */
    'vue/no-v-html': 'off',
    'vue/no-unused-vars': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-closing-bracket-newline': [
      'off',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/require-default-prop': 'off',

    /**
     * 规则配置: https://eslint.bootcss.com/docs/rules/
     * 'off' | 0: 表示关掉，
     * 'warn' | 1: 表示发出警告
     * 'error' | 2: 表示发出错误
     *
     * 'always': 总是开启
     * 'never': 从不开启
     */

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /**
     * Possible Errors
     * 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
     */

    'no-case-declarations': 'off',
    'no-await-in-loop': 'error',
    'no-template-curly-in-string': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'error',
    'no-regex-spaces': 'error',
    'no-unexpected-multiline': 'error',
    'no-unsafe-negation': 'error',
    // 'valid-jsdoc': 'error', // 强制使用 JSDoc 注释风格

    /**
     * Best Practices
     * 这些规则是关于最佳实践的，帮助你避免一些问题
     */
    curly: ['error', 'all'], // 强制使用大括号，单条语句不能省略大括号
    'no-else-return': ['error', { allowElseIf: true }], // (默认) 允许在 return 之后有 else if 块
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-multi-spaces': 'error',
    'no-useless-return': 'error',
    'wrap-iife': ['error', 'inside'],
    yoda: ['error', 'never'],

    /**
     * Variables
     * 这些规则与变量声明有关
     */

    'no-undef-init': 'error',
    // 'no-unused-vars': 'off',

    /**
     * Stylistic Issues
     * 这些规则是关于风格指南的，而且是非常主观的
     */

    'array-bracket-newline': 'off',
    'lines-around-comment': [
      'off',
      {
        beforeBlockComment: true,
        afterBlockComment: true,
        beforeLineComment: true,
        afterLineComment: true,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true
      }
    ],
    // 'space-before-function-paren': ['error', 'always'], // 要求或禁止函数圆括号之前有一个空格
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-tabs': ['error', { allowIndentationTabs: true }],

    /**
     * ECMAScript 6
     * 这些规则只与 ES6 有关, 即通常所说的 ES2015
     */
    'arrow-parens': ['error', 'as-needed'], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': ['error', { before: true, after: true }], // 要求箭头函数的箭头之前或之后有空格
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-useless-computed-key': 'error', // 禁止在对象中使用不必要的计算属性
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false
      }
    ], // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ], // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-spread': 'error', // 建议使用扩展运算符而非.apply()
    'prefer-template': 'error', // 建议使用模板而非字符串连接
    'rest-spread-spacing': ['error', 'never'], // 强制剩余和扩展运算符及其表达式之间有空格
    'sort-imports': 'off', // import 排序
    // 'template-curly-spacing': ['error', 'always'], // 强制模板字符串中空格的使用
    'yield-star-spacing': ['error', 'both'], // 强制在 yield* 表达式中 * 周围使用空格

    /**
     * 自动格式化代码 prettier 配置
     */

    'prettier/prettier': [
      'warn',
      {
        semi: true,
        singleQuote: true,
        quoteProps: 'consistent',
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        useTabs: false,
        vueIndentScriptAndStyle: false,
        endOfLine: 'lf',
        htmlWhitespaceSensitivity: 'ignore'
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
```

```javascript
// vue.config.js
const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production'; // 是否是生产环境

/**
 * 代码压缩工具
 *
 * @dependency terser-webpack-plugin
 */
const TerserPlugin = require('terser-webpack-plugin');

/**
 * 打包分析工具
 *
 * @dependency webpack-bundle-analyzer
 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const port = 9001;

/**
 * 普通代理模式
 */
const devProxy = {
  '/api': {
    target: 'http://localhost:3000', // 代理的 API 地址
    changeOrigin: true, // 将主机标头的原点更改为目标URL
    secure: false,
    pathRewrite: {
      '^/api': ''
    }
  }
};

module.exports = {
  indexPath: 'index.html',
  assetsDir: 'static',
  lintOnSave: false,
  publicPath: './', // 部署应用包时的基本 URL 为相对路径
  productionSourceMap: false, // 生产环境下的 source map
  //代理
  devServer: {
    port: port,
    proxy: devProxy
  },

  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    requireModuleExtension: true, // 启用 CSS modules for all css / pre-processor files.

    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true // antd必须加入该项
      }
    }
  },

  pluginOptions: {
    /**
     * 给vue页面加上全局样式和变量，无需在每个vue文件中引入样式（引入多次会导致全局样式类名出现多次）
     *
     * @dependency style-resources-loader
     * @dependency vue-cli-plugin-style-resources-loader
     */
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/style/global.less')]
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/) // 只引入 moment 的中文包
      // new BundleAnalyzerPlugin({ analyzerPort: 8888 }), // js 依赖打包分析
    ],
    devtool: !isProduction ? 'cheap-module-eval-source-map' : false,
    performance: {
      // 控制webpack如何通知超出特定文件限制的资产和入口点
      hints: false // 关闭提示
    },
    optimization: {
      minimizer: [
        // ============代码压缩 start============
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          extractComments: false, // 删除注释
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            output: {
              comments: false // 删除注释
            },
            compress: {
              warnings: false, // 若打包错误，则注释这行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          }
        })
        // ============代码压缩 end============
      ],
      splitChunks: {
        // chunks: 'async', //默认`async`只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
        minChunks: 1, // 模块至少被引用的次数
        // minSize: 30000, // 合并前模块文件的体积，约30Kb
        // maxSize: 0, // 用于http2和长期缓存
        maxAsyncRequests: 6, // 异步并行加载的最大代码块数量，默认5
        maxInitialRequests: 6, // 页面初始化加载的最大代码块数量，默认3
        // automaticNameDelimiter: '-', //自动命名连接符
        cacheGroups: {
          // eslint-disable-next-line prettier/prettier
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            priority: 10
          },
          'async-vendors': {
            test: /[\\/]node_modules[\\/]/,
            minChunks: 2,
            chunks: 'async',
            name: 'async-vendors'
          },
          // eslint-disable-next-line prettier/prettier
          commons: {
            name: 'chunk-commons',
            test: path.join(__dirname, 'src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          // eslint-disable-next-line prettier/prettier
          runtimeChunk: {
            name: 'runtime'
          }
        }
      }
    }
  }
};
```

## 引入 antd

- 修改 shims-vue.d.ts

```typescript
// shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// 加入下面这段
declare module 'ant-design-vue' {
  const Antd: any;
  export default Antd;
}
```

- utils 文件夹下新建文件 components-antd.ts

```typescript
import Vue from 'vue';
import Antd from 'ant-design-vue';
let {
  Col,
  Row,
  Modal,
  Message
  // 按需引入需要的组件名称
} = Antd;
Vue.use(Col);
Vue.use(Row);
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
```

- 安装依赖 less less-loader babel-plugin-import
- 修改 vue.config.js babel.config.js

```javascript
// vue.config.js
module.export = {
	...
	css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    requireModuleExtension: true, // 启用 CSS modules for all css / pre-processor files.

    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  ...
}

```

```javascript
// babel.config.js
...
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
 ...
```

```typescript
// main.ts
import '@/utils/components-antd.ts';
```

## vue 文件如何开发

```vue
<template>
  <div>
    <a-row>
      <a-col>
        <a-button @click="onClick('someVal')">{{ msg }}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
@Component
export default class App extends Vue {
  @Prop({ default: 'default' })
  propA: string;

  msg = 'antd btn';

  @Watch('msg', { immediate: true, deep: true })
  onChildChanged(val: string, oldVal: string) {
    // ...
  }

  mounted() {
    something();
  }

  get computedMsg() {
    // ...
  }

  //在Vue中我们是使用$emit触发事件,使用vue-property-decorator时,可以借助@Emit装饰器来实现.@Emit修饰的函数所接受的参数会在运行之后触发事件的时候传递过去
  @Emit('doSth')
  onClick(val) {
    // ...
  }

  something() {
    // ...
  }
}
</script>
```

```vue
<template>
  <div>
    <child :propA="propA" @doSth="doSth"></child>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Child from './child.vue';
@Component({
  components: { Child }
})
export default class Layout extends Vue {
  propA = 'propA';

  doSth(val) {
    // ...
  }
}
</script>
```
