const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除dist文件夹文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成创建HTML入口
const WebpackBar = require('webpackbar'); // webpack进度条
const FriendsErrorsPlugins = require('friendly-errors-webpack-plugin'); // 控制台输出（更加友好）
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 构建通知
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');

const paths = require('./path');
const { __DEV__} = require('./env.js');

const htmlMinifierOptions = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLineTypeAttributes: true,
  minifyCss: true,
  minifyJs: true,
  minifyURLs: true,
  useShortDoctype: true,
  removeAttributeQuotes: true, // 删除双引号
  collapseWhitespace: true // 压缩成一行
}

module.exports = {
  // webpack入口文件  默认查找src/index
  entry: [
    'react-hot-loader/patch', // 热更新补丁
    paths.appEntry
  ],
  // webpack输出文件
  output: {
    // 输出文件名
    path: paths.appBuild,
    // 输出路径
    filename: 'js/[name]-[hash].bundle.js',
    publicPath: paths.outPutpublicPath
  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置loader、解析器等选项）
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        // 开启缓存
        options: {
          cacheDirectory: true
        },
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1)
      },
      {
        test: /.less$/,
        use: [
          ...getCssLoaders(2),
          {
            // 先让less-loader将less转换为less,再交给css-loader处理
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片低于10k会被转换成base64格式的dataUrl
              limit: 10 * 1024,
              // 文件名中都插入了文件内容 hash 值，这样就可以解决强缓存需要立即更新的问题
              name: '[name].[contenthash].[ext]',
              // 保存到images文件夹下
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 文件名中都插入了文件内容 hash 值，这样就可以解决强缓存需要立即更新的问题
              name: '[name].[contenthash].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.ts', '.tsx', '.js', '.json'] // 我们导入ts等模块一般不使用后缀名，webpack会尝试使用这个数组提供的后缀名去导入
  },
  // build应该运行的环境
  target: 'web',
  // 插件配置
  plugins: [
    // 使用插件清除dist中文文件
    new CleanWebpackPlugin(),
    // 使用插件生成html文件入口
    new HtmlWebpackPlugin({
      template: paths.appIndex,
      // 模块文件名
      filename: 'index.html',
      // 只在生产环境压缩
      minify: __DEV__ ? false : htmlMinifierOptions,
      hash: true,
      // 制定webpack打包的js css静态资源插入到html的位置，true为body底部,false为head中
      inject: true,
      templateParameters: (...args) => {
        const [ compilation, assets, assetTags, options ] = args;
        const rawPublicPath = paths.outPutpublicPath;
        return {
          compilation,
          webpackConfig: compilation.options,
          HtmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          // 除掉public的反斜杠,让用户在模版中拼接更自然
          PUBLIC_PATH: rawPublicPath.endsWith('/') ? rawPublicPath.slice(0, -1) : rawPublicPath
        }
      }
    }),
    // webpack进度条
    new WebpackBar({
      name: '🚌 🚌 🚌 🚌 🚌 🚌',
      color: '#61dafb' // react 蓝
    }),
    new FriendsErrorsPlugins(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic, // 相对项目的根目录
          to: paths.appBuild // 路径相对webpack配置的output路径
        }
      ]
    })
  ]
}

function getCssLoaders (importLoaders) {
  return [
    // MiniCssExtractLoader 和 style-loader 不能共存，分开使用 
    __DEV__ ? 'style-loader' : MiniCssExtractLoader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: true,
        importLoaders
      }
    },
    // {
    //   loader: 'postcss-loader
    // }
  ]
}