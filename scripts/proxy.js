const createProxyMiddleware = require( 'http-proxy-middleware');
const chalk = require('chalk');

const proxyTable  = {
  // 事例配置
  // '/path_to_be_proxy': {
  //   target: 'http://target.domain.com',
  //   changeOrigin: true
  // }
}

// 修饰链接的辅助函数，修改颜色并添加下划线
function renderLink (str) {
  return chalk.magenta.underline(str);
}

module.exports = function proxy (server) {
  Object.entries(proxyTable).forEach(([path, options]) => {
    const from = path;
    const to = options.target;
    console.log(`proxy ${renderLink(from)} ${chalk.green('->')} ${renderLink(to)}`);

    // eslint-disable-next-line no-param-reassign
    if (!options.logLevel) {
      options.logLevel = 'warn';
    }
    server.use(path, createProxyMiddleware(options));

    // 如果需要更灵活的定义方式，请在下面直接使用 server.use(path, proxyMiddleware(options))
  });
  process.stdout.write('\n');
}
