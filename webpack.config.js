const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[chunkhash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "indice.html",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new HtmlWebpackPlugin({  // Also generate a page.html
      filename:  "page.html",
      template: path.resolve(__dirname, "src", "page.html"),
      title: "Page"
    }),
    new HtmlWebpackPlugin({  // Also generate a page.html
      filename:  "other-page.html",
      template: path.resolve(__dirname, "src", "other-page.html"),
      title: "Other Page"
    }),
  ],
  devServer: {
    openPage: 'indice.html',
    port: 8091,
    overlay: true,
    open: "Google Chrome", // 'Google Chrome' on macOS, 'google-chrome' on Linux and 'chrome' on Windows
  }
};
