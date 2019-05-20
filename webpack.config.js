const path = require('path');

const webpack           = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  context: __dirname + "/",
  entry: ["whatwg-fetch","./entry.js"],
  output: {
    path: __dirname + "/bundles",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            use: [
              "css-loader",
              "postcss-loader",
              "sass-loader"
            ],
            fallback: "style-loader"
          })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: "img/[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise'
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  }
}
