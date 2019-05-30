const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './public/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  resolve: {
    alias: {
      css: path.resolve(__dirname, 'public/css'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env'] }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'svg/',
              publicPath: '/svg',
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/fonts',
            }
          }
        ]
      }
    ]
  }
};
