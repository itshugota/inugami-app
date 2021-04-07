const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: './assets/images/favicon.png',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, 'assets/images'),
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './images'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        include: path.resolve(__dirname, 'assets/fonts'),
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './fonts'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'assets'),
      Config: path.resolve(__dirname, 'src/app/config'),
      Enums: path.resolve(__dirname, 'src/app/enums')
    }
  }
};
