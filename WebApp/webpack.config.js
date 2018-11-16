let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  '@material-ui/core', '@material-ui/icons','axios','react-bootstrap','react-feather',
    'react-router','react-router-dom', 'react', 'redux', 'react-redux', 
    'react-dom', 'redux-form', 'redux-thunk'
]; 

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader'
        },
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
   new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  devServer: {
    compress: true,
    port: 3001
  }

};
