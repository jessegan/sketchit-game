const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
})

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  plugins: [
    htmlPlugin
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  }
}