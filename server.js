var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(80, 'k-frontend-report.404mzk.com', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at k-frontend-report.404mzk.com');
});
