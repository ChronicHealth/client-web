const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const common = require('./webpack.config.common.js');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'source-map',
  entry: {
    app: './src/index',
    vendor: [
      'react',
      'react-dom',
      'react-flexbox-grid',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-toolbox',
      'redux',
      'redux-batched-actions',
      'redux-compose-hors',
      'redux-retype-actions',
      'redux-thunk',
      'reselect',
      'history',
      'immutable',
      'jwt-decode',
      'khange',
      'material-design-icons',
      'classnames',
      'deepmerge',
    ],
  },
  output: Object.assign(common.output, { filename: '[name].[chunkhash].js' }),
  plugins: common.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_CONNECTION: JSON.stringify(process.env.API_CONNECTION),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new StatsWriterPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ]),
  module: common.module,
};
