const path = require('path')
module.exports = {
  use: ['@neutrinojs/style-loader', {
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.join(__dirname, '..', 'postcss.config.js')
          },
          includePaths: [path.join(__dirname, '..', 'node_modules', 'react-toolbox')]
        }
      } 
    ]
  }]
}