const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config()

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 8000
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      path: path.resolve(__dirname, "./dist"),
      filename : 'index.html'
  }),
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
    })
  ]
};