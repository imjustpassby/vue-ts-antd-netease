const path = require('path');
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production'; // 是否是生产环境
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启gzip压缩， 按需引用
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

function getExternals() {
  return {
    'ant-design-vue': 'antd',
    // eslint-disable-next-line prettier/prettier
    xgplayer: 'xgplayer',
    // eslint-disable-next-line prettier/prettier
    vue: 'Vue',
    'vue-router': 'VueRouter',
    // eslint-disable-next-line prettier/prettier
    vuex: 'Vuex',
    // eslint-disable-next-line prettier/prettier
    axios: 'axios',
    'vue-lazyload': 'VueLazyload'
  };
}

module.exports = {
  indexPath: 'index.html',
  assetsDir: 'static',
  lintOnSave: false,

  // 部署应用包时的基本 URL 为相对路径
  publicPath: './',

  // 生产环境下的 source map
  productionSourceMap: false,

  //代理
  devServer: {
    port: port,
    proxy: devProxy
  },

  css: {
    extract: isProduction,
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true
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
      patterns: [path.resolve(__dirname, 'src/assets/style/var.less')]
    }
  },

  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/) // 只引入 moment 的中文包
      // new BundleAnalyzerPlugin({ analyzerPort: 8888 }), // js 依赖打包分析
    ],
    devtool: !isProduction ? 'cheap-module-eval-source-map' : false,
    performance: {
      // 控制webpack如何通知超出特定文件限制的资产和入口点
      hints: false // 关闭提示
    },
    externals: process.env.NODE_ENV === 'production' ? getExternals() : {},
    optimization: {
      minimizer: [
        // ============代码压缩 start============
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false, // Must be set to true if using source-maps in production
          extractComments: true, // 删除注释
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            output: {
              comments: true // 删除注释
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
        chunks: 'all', //默认`async`只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
        minChunks: 1, // 模块至少被引用的次数
        minSize: 0, // 合并前模块文件的体积，约30Kb
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
            minChunks: 2, //  minimum common number
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
  },

  runtimeCompiler: true
};
