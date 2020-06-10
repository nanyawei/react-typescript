const path = require('path');

const resolvePath = resolvePath => path.resolve(process.cwd(), resolvePath);

module.exports = {
  appSrc: resolvePath('src'),
  appBase: resolvePath('./'),
  appBuild: resolvePath('dist'),
  appIndex: resolvePath('src/index.html'),
  appEntry: resolvePath('src/index.tsx'),
  outPutpublicPath: '/',
  appPublic: resolvePath('public'),
  tsConfigPath: resolvePath('./tsconfig.json'),
  hmrPath: '/__webpack_hmr'
}