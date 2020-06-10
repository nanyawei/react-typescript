const { HotModuleReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// 引入webpack-merge插件进行合并
const merge = require('webpack-merge');
// 引入基本配置
const base = require('./webpack.config');

const paths = require('./path');
base.entry.unshift(`webpack-hot-middleware/client?path=${paths.hmrPath}`);

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    publicPath: paths.outPutpublicPath,
    contentBase: [paths.appBuild],
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  // 启用source-map方便调试
  devtool: 'eval-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 1024,
      // babel转换的是前端代码，所以是指向前端代码的tsconfig
      tsconfig: paths.tsConfigPath
    }),
    new HotModuleReplacementPlugin()
  ]
});