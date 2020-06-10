const __DEV__ = process.env.NODE_ENV !== 'production';
const HOST = 'localhost';
const PORTLIST = [3000, 4000, 8080, 8888];
module.exports = {
  __DEV__,
  HOST,
  PORTLIST
};
