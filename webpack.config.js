const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[chunkhash].js",
    publicPath: "/",
    assetModuleFilename: "assets/[name]-[hash:8][ext]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/assets/images/logo.png"), // svg works too!
      mode: "light", // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      devMode: "light", // optional can be 'webapp' or 'light' - 'light' by default
      prefix: "assets-pwa/", // Prefix path for generated assets
      manifest: "./src/manifest.json",
      // favicons: {
      //   appName: 'W CAD',
      //   appDescription: 'W Cad App',
      //   developerName: 'Evandro C. Severgnini',
      //   developerURL: 'https://github.com/evandrosevergnini', // prevent retrieving from the nearest package.json
      //   background: '#eee',
      //   theme_color: '#eee',
      //   icons: {
      //     coast: false,
      //     yandex: false
      //   }
      // }
    }),
    new HtmlWebpackPlugin({
      filename: "indice.html",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new HtmlWebpackPlugin({
      // Also generate a page.html
      filename: "page.html",
      template: path.resolve(__dirname, "src", "page.html"),
      title: "Page",
    }),
    new HtmlWebpackPlugin({
      // Also generate a page.html
      filename: "other-page.html",
      template: path.resolve(__dirname, "src", "other-page.html"),
      title: "Other Page",
    }),
  ],
  devServer: {
    openPage: "indice.html",
    port: 8091,
    overlay: true,
    open: "Google Chrome", // 'Google Chrome' on macOS, 'google-chrome' on Linux and 'chrome' on Windows
  },
};
