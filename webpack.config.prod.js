const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifycssWebpack = require("purifycss-webpack"); //去除无用的css
const glob = require("glob"); //分析路径工具
const path = require("path");
const config = require("./webpack.config.common");
const merge = require("webpack-merge");
module.exports = merge(config, {
  module: {
    rules: [{
      test: /\.js$/,
      use: ["babel-loader"],
      exclude: [path.resolve(__dirname, "node_modules")]
    }, {
      test: /\.css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../"
          }
        },
        {
          loader: 'css-loader',
          options: {
            name: "css/[name]_[hash:base64:8].css",        
          }
        },
        "postcss-loader",
      ]
    }, {
      test: /\.(scss|sass)$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../"
          }
        },
        {
          loader: 'css-loader',
          options: {
            name: "css/[name]_[hash:base64:8].css",
          }
        },
        "postcss-loader",
        "sass-loader"
      ]
    }, {
      test: /\.(jpg|jpeg|gif|png)$/,
      use: [{
        loader: "file-loader",
        options: {
          limit: 10000,
          name: "img/[name]_[hash:base64:8].[ext]",
        }
      }]
    }, {
      test: /\.html$/,
      use: ["html-loader"]
    }]
  },
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash:6].css",
      chunkFilename: "css/[name].[hash:6].css",
    }),
    new PurifycssWebpack({
      paths: glob.sync(path.join(__dirname, "src/page/*/*.html")),
      minimize: true,
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          filename: "js/[name].[hash:6].js"
        }
      },
    }
  }
});