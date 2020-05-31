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

/**
 * 若开启了 mock server，需保证项目的端口与此一致
 *
 * 当被占用时，node会新开个端口给项目使用，但是 mock server 的端口还是用的此数据，
 * 因此需手动改此值，保证项目端口与 mock server 的端口一致
 * @todo 期望能自动获取项目启动的端口，有待改进
 *
 * @type {number}
 */
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
        lessOptions: {
          modifyVars: {
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
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
      patterns: [path.resolve(__dirname, 'src/assets/less/global.less')]
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
