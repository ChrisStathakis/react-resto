var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var ip = 'localhost';

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  context: __dirname,
  entry : {
    App1: [
      'webpack-dev-server/client?http://' + ip + ':3000',
      'webpack/hot/only-dev-server',
      './frontend/src/index',
    ]
  },
  
  output: {
      path: path.resolve('./frontend/static/frontend/'),
      filename: "[name]-[hash].js",
      publicPath: 'http://' + ip + ':3000' + '/frontend/'
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    
    new BundleTracker({filename: './webpack-stats.json'})
  ]
 
};








