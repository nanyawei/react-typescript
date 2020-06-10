const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BannerPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('Terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const SizePlugin = require('size-plugin');

const base = require('./webpack.config.js');
const paths = require('./path.js');
// const { isAnalyze } = require('./env.js');

const mergedConfig = merge(base, {
  mode: 'production',
  optimization: {
    // 使用 minimizer 而不是默认的 uglifyJS
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        // os.cpus().length - 1
        parallel: true,
        include: paths.appSrc,
        extractComments: false
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }, 
  plugins: [
    new MiniCssExtractPlugin({
      // 文件名中插入文件内容的hash值
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: false
    }),
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 1024 * 2,
      // babel转换的是前端代码，所以是指向前端代码的tsconfig
      tsconfig: paths.tsConfigPath
    }),
    // webpack 内置 BannerPlugin 版权声明
    new BannerPlugin({
      raw: true,
      // 注释添加了 @preserve 标记，后面会使用terser在生产环境构建时压缩代码，压缩代码时会去掉所有注释，包括@preserve
      banner: `/** @preserve -------- Powered By Console 这里是版权声明 -------- */`
    }),
    new SizePlugin({
      writeFile: false
    })
  ]
});

// 对打包时间进行统计
const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);

// if (isAnalyze) {
//   mergedConfig.plugins.push(new Bun)
// }

module.exports = prodConfig;