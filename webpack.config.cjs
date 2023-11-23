const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    background: path.resolve(__dirname, "src", "background.ts"),
    content: path.resolve(__dirname, "src", "scripts", "content.ts")
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "manifest.json"), to: path.resolve(__dirname, "dist") }
      ]
    })
  ]
};
