const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `"${process.env.NODE_ENV}"`
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
];

if (process.env.NODE_ENV == 'production') {

  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  );

  plugins.push(
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  );

  plugins.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  );
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[chunkhash].js'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css/,
        use: process.env.NODE_ENV === 'production' ?
          ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader']
          }) : ['vue-style-loader', 'css-loader']
      }
    ]
  }
}
