const { loader: MiniCssExtractLoader } = require('mini-css-extract-plugin');
const { __IS_DEV__ } = require('./env.js');

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

function getCssLoaders (importLoaders) {
  return [
    // MiniCssExtractLoader 和 style-loader 不能共存，分开使用 
    __IS_DEV__ ? 'style-loader' : MiniCssExtractLoader,
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

module.exports = {
  htmlMinifierOptions,
  getCssLoaders
}