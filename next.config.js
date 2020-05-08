const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config) => {
    config.node = { fs: "empty" };
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
        result.request = result.request.replace(/typeorm/, "typeorm/browser");
      })
    );
    config.plugins.push(
      new webpack.ProvidePlugin({
        "window.SQL": "sql.js/dist/sql-wasm.js",
      })
    );
    config.plugins.push(
      new CopyPlugin([
        {
          from: path.join(__dirname, "node_modules/sql.js/dist/sql-wasm.wasm"),
          to: path.join(__dirname, "public/"),
        },
      ])
    );
    return config;
  },
};
