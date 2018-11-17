const path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      use: ['css-loader']
    }]
  }
};
