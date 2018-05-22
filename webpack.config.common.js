const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const entry = {
  index: "./src/page/index/index.js",
  main: "./src/page/main/main.js",
};
const pages = [
  new HtmlWebpackPlugin({
    title: "index",
    template: "./src/page/index/index.html",
    filename: "index.html",
    chunks: ["commons", "index"],
    favicon: ''
  }),
  new HtmlWebpackPlugin({
    title: "main",
    template: "./src/page/main/main.html",
    chunks: ["commons", "main"],
    filename: "main.html",
    favicon: ''
  })
]
pages.forEach(item => {
  item.options.minify = {
    collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
    removeAttributeQuotes: true
  }
})
module.exports = {
  entry: entry,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ''
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src/common"), ]
  },
  plugins: [
    new CleanWebpackPlugin(["./dist"]),
  ].concat(pages),
}