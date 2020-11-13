const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: ["@babel/polyfill", "./src/index.js"],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@atoms": path.resolve(___dirname, "src/components/atoms"),
      "@molecules": path.resolve(___dirname, "src/components/molecules"),
      "@organisms": path.resolve(___dirname, "src/components/organisms"),
      "@constants": path.resolve(___dirname, "src/constants"),
      "@pages": path.resolve(___dirname, "src/pages"),
      "@stores": path.resolve(___dirname, "src/stores"),
      "@utils": path.resolve(___dirname, "src/utils"),
    }
  },
  devtool: "eval-cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    hot: true,
    port: 8000,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      path: path.resolve(__dirname, "./dist"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new FaviconsWebpackPlugin("./octocat.png"),
    new Dotenv(),
  ],
};
