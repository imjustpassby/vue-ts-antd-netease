{
  mode: 'development',
  context: 'F:\\github\\vue-ts-antd-netease',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'F:\\github\\vue-ts-antd-netease\\dist',
    filename: 'static/js/[name].js',
    publicPath: '',
    chunkFilename: 'static/js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'F:\\github\\vue-ts-antd-netease\\src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'F:\\github\\vue-ts-antd-netease\\node_modules',
      'F:\\github\\vue-ts-antd-netease\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'F:\\github\\vue-ts-antd-netease\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
      'F:\\github\\vue-ts-antd-netease\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'F:\\github\\vue-ts-antd-netease\\node_modules',
      'F:\\github\\vue-ts-antd-netease\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\github\\vue-ts-antd-netease\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '18d17853'
            }
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'F:\\github\\vue-ts-antd-netease\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '18d17853'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'static/img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              },
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    'F:\\github\\vue-ts-antd-netease\\src\\assets\\less\\global.less'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              },
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    'F:\\github\\vue-ts-antd-netease\\src\\assets\\less\\global.less'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              },
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    'F:\\github\\vue-ts-antd-netease\\src\\assets\\less\\global.less'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  javascriptEnabled: true
                }
              },
              {
                loader: 'style-resources-loader',
                options: {
                  patterns: [
                    'F:\\github\\vue-ts-antd-netease\\src\\assets\\less\\global.less'
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                options: {
                  hmr: true,
                  publicPath: '../../'
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\github\\vue-ts-antd-netease\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '3eba2bb3'
            }
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\github\\vue-ts-antd-netease\\node_modules\\.cache\\ts-loader',
              cacheIdentifier: '0eb2161a'
            }
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\babel-loader\\lib\\index.js'
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'F:\\github\\vue-ts-antd-netease\\node_modules\\.cache\\ts-loader',
              cacheIdentifier: '0eb2161a'
            }
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\babel-loader\\lib\\index.js'
          },
          {
            loader: 'F:\\github\\vue-ts-antd-netease\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        antDesignVue: {
          name: 'chunk-antd',
          priority: 20,
          test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
          chunks: 'all'
        },
        libs: {
          name: 'chunk-libs',
          priority: 10,
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial'
        },
        commons: {
          name: 'chunk-commons',
          test: 'F:\\github\\vue-ts-antd-netease\\src\\components',
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        },
        runtimeChunk: {
          name: 'runtime'
        }
      },
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 6
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      },
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: false,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            output: {
              comments: false
            },
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
              pure_funcs: [
                'console.log'
              ]
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '""'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'vue-admin-antd',
        templateParameters: function () { /* omitted long function */ },
        template: 'F:\\github\\vue-ts-antd-netease\\public\\index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'F:\\github\\vue-ts-antd-netease\\public',
          to: 'F:\\github\\vue-ts-antd-netease\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        vue: {
          enabled: true,
          compiler: 'vue-template-compiler'
        },
        tslint: false,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }
    ),
    {
      resourceRegExp: /moment[\/\\]locale$/,
      newContentResource: undefined,
      newContentRecursive: undefined,
      newContentRegExp: /zh-cn/
    }
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  },
  externals: {
    'ant-design-vue': 'antd'
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
}
