const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "demo", "index"),
  mode: "development",
  output: {
    path: __dirname + "/demoDist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    proxy: [
      {
        context: ["/v1", "/v2", "/v3", "/v2/whitelabel"],
        target: "https://exposure.api.redbee.dev", // Prestage
        // target: "https://exposure.api.redbee.live", // Prod
        changeOrigin: true,
        headers: {
          "www-authenticate": "Bearer"
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules\/(?!@ericssonbroadcastservices)/],
        use: "swc-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
