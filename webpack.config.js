const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin   = require("css-minimizer-webpack-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const path                 = require("path");

// ThemeWatcher is only available in Salla's CI/CD environment
let ThemeWatcher;
try { ThemeWatcher = require("@salla.sa/twilight/watcher.js"); } catch (e) { ThemeWatcher = class { apply() {} }; }

const asset  = (file = "") => path.resolve("src/assets", file);
const output = (file = "") => path.resolve("public", file);

module.exports = {
  entry: {
    app           : [asset("styles/app.scss"), asset("js/app.js")],
    "product-card": asset("js/partials/product-card.js"),
  },
  output: {
    path : output(),
    clean: true,
    chunkFilename: "[name].[contenthash].js",
  },
  stats: { modules: false, assetsSort: "size", assetsSpace: 50 },
  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        use    : {
          loader : "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime", { regenerator: true }]],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use : [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ThemeWatcher(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: asset("images"), to: output("images"), noErrorOnMissing: true }],
    }),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
};

