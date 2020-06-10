const chalk = require('chalk');
const getPort = require('get-port'); // 用于获取可用端口
const logSymbols = require('log-symbols'); // 提供了四种log字符：info success earning error
const open = require('open'); // 用于系统应用打开uri(uri包括文件和网址)
const webpack = require('webpack');
const express = require('express');
const historyFallback = require('connect-history-api-fallback');
const cors = require('cors');
// yargs 用于解析命令行参数
const argv = require('yargs').argv;
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devConfig = require('../config/webpack.dev.config');
const paths = require('../config/path.js');
const proxy = require('./proxy.js');

const { WEBPACK_HOST = 'localhost', WEBPACK_PORT = 8000 } = process.env;

function openBrowser(compiler, address) {
  if (argv.open) {
    let hasOpen = false;
    // 编译完成执行
    compiler.hooks.done.tap('open-browser-plugin', async (stats) => {
      // 没有打开过浏览器并且没有编译错误就打开浏览器
      if (!hasOpen && !stats.hasErrors()) {
        await open(address);
        hasOpen = true;
      }
    })
  }
}

function setUpMiddlewares(compiler, server) {
  const publicPath = devConfig.output.publicPath;

  // 设置代理
  proxy(server);

  // 使用 browserRouter 需要重定向所有 html 页面到首页
  server.use(historyFallback());

  // 开发 chrome 扩展的时候可能需要开启跨域 参考：https://juejin.im/post/5e2027096fb9a02fe971f6b8
  server.use(cors());

  const devMiddlewareOptions = {
    // 保持和webpack配置一样
    publicPath,
    // 只有在发生错误或有新的编译时输出
    stats: 'minimal'
  };
  server.use(webpackDevMiddleware(compiler, devMiddlewareOptions));

  const hotMiddlewareOptions = {
    // sse 路由
    path: paths.hmrPath,
    // 编译出错会在网页上显示错误信息遮罩
    overlay: true,
    // webpack 卡住自动刷新页面
    reload: true
  };
  server.use(webpackHotMiddleware(compiler, hotMiddlewareOptions));
}

async function start() {

  // 4个备选端口，都被占用会使用随机端口
  const PORT = await getPort({ port: [ WEBPACK_PORT ] });
  const address = `http://${WEBPACK_HOST}:${PORT}`;

  // 加载 webpack 配置
  const compiler = webpack(devConfig);
  openBrowser(compiler, address);

  const devServer = express();
  setUpMiddlewares(compiler, devServer);

  const httpServer = devServer.listen(PORT, WEBPACK_HOST, err => {
    if (err) {
      console.log(err);
      return;
    }

    // logSymbols.success 在 window 平台渲染为 ✔️ ,支持的平台会显示 ✔️
    console.log(
      `DevServer is running at ${chalk.rgb(97, 218, 251).underline(address)} ${logSymbols.success}`
    )
  });

  // 我们监听了 node 信号，所以使用 cross-env-shell 而不是 cross-env
  // 参考: https://github.com/kentcdodds/cross-env#cross-env-vs-cross-env-shell
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      // 先关闭 devServer
      httpServer.close();
      // 在 ctrl+c 的时候随机输出 'See you again' 和 'Goodbye'
      console.log(
        chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`)
      );
      // 推出node程序
      process.exit();
    });
  });
};

// require.main === module 判断这个模块是不是被直接运行的
if (require.main === module) {
  start();
}
