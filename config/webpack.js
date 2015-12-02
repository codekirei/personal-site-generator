'use strict'

const webpack = require('webpack')
const loc = require('conf/locations')

module.exports = {
  context: loc.src.scripts,
  entry: {
    bundle: './main.js'
  },
  output: {
    path: loc.dist.scripts,
    filename: '[name].js'
  },
  debug: true,
  cache: {},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
  }
}
module.exports.dist = {
  debug: false,
  cache: false,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
}
