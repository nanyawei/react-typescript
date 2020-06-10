const webpack = require('webpack');

const prodConfig = require('../config/webpack.prod.config.js');
const compiler = webpack(prodConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
    return;
  };

  const prodStatsOpts = {
    preset: 'normal',
    // modules: 
    colors: true
  };

  console.log(stats.toString(prodStatsOpts));
});