var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var pkg = require('./package.json');
var publicPath = '/assets/@vtex.' + pkg.name + '/';

var config = {
  devtool: 'sourcemap',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/' + pkg.name + '.jsx'
  ],

  externals: {
    'storefront': 'storefront',
    'react': 'React',
    'react-router': 'ReactRouter',
    intl: 'Intl',
    'react-intl': 'ReactIntl'
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      'components': __dirname + '/src/components/',
      'pages': __dirname + '/src/pages/',
      'styles': __dirname + '/src/styles/',
      'utils': __dirname + '/src/utils/'
    }
  },

  output: {
    path: path.resolve(__dirname, './storefront/assets/'),
    publicPath: publicPath,
    filename: pkg.name + '.js'
  },

  jshint: {
    esnext: true
  },

  module: {
    preLoaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],

    loaders: [
      {
        test: /\.jsx$/,
        exclude: [node_modules_dir],
        loaders: ['react-hot', 'babel-loader']
      }, {
        test: /\.js$/,
        exclude: [node_modules_dir],
        loaders: ['babel-loader']
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.(png|jpg|woff|ttf|eot|svg|woff2)$/,
        loader: "url-loader?limit=100000"
      }, {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  quiet: false,

  noInfo: false,

  devServer: {
    publicPath: publicPath,
    port: 3000,
    hot: true,
    inline: true,
    stats: {
      assets: false,
      colors: true,
      version: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    historyApiFallback: true,
    proxy: {
      "*": "http://janus-edge.vtex.com.br/"
    }
  }
};

module.exports = config;
