const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');
const { __IS_DEV__ } = require('./env.js');
const { resolvePath } = require('./path.js');

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

function getCssLoaders (...args) {
  const importLoaders = 2 + (args.length || 0);

  return [
    // MiniCssExtractLoader 和 style-loader 不能共存，分开使用 
    __IS_DEV__ ? 'style-loader' : MiniCssExtractLoader,
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders
      }
    },
    {
      loader: 'postcss-loader'
    },
    ...args,
    {
      loader: 'style-resources-loader',
      options: {
        patterns: [
          resolvePath('src/styles/index.less')
        ]
      }
    }
  ]
}

module.exports = {
  htmlMinifierOptions,
  getCssLoaders
}