const fs = require('fs');

const __IS_DEV__ = process.env.NODE_ENV !== 'production';

// 读取环境变量把它转化为对象
const readEnv = (fileUrl) => {
  let data = fs.readFileSync(fileUrl, { encoding: 'utf8' });
  const d = data.split(/\rn|\n|\r/gm).map(d => d.split(/\=/));
  const env = {};
  d.map(item => env[item[0]] = item[1])
  return env;
}

module.exports = {
  __IS_DEV__,
  readEnv
};
