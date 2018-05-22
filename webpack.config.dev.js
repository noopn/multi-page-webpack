const path = require("path");
const config = require("./webpack.config.common");
const merge = require("webpack-merge");
const webpack = require("webpack");
module.exports = merge(config, {
  module: {
    rules: [{
      test: /\.js$/,
      use: ["babel-loader"],
      exclude: [path.resolve(__dirname, "node_modules")]
    }, {
      test: /\.css$/,
      use: [
        "style-loader", "css-loader"
      ]
    }, {
      test: /\.(scss|sass)$/,
      use: [
        "style-loader", "css-loader", "sass-loader"
      ]
    }, {
      test: /\.(jpg|jpeg|gif|png)$/,
      use: ["file-loader"]
    }, {
      test: /\.html$/,
      use: ["html-loader"]
    }]
  },
  devtool: "source-map",
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9001,
    open: true,
    hot: true,
  }
})