const { resolve } = require('path')

module.exports = async (options = {}) => {
  return {
    entry: {
      'index': './src/index.js'
    },
    output: {
      path: resolve(__dirname, './dist'),
      filename: '[name].js',
      library: 'DomMark',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true,
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.s[a|c]ss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'assets/[name].[hash].[ext]',
                limit: 5000
              }
            }
          ]
        }
      ]
    },
    plugins: [],
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '~': resolve(__dirname, '../src')
      }
    },
    devtool: options.dev ? '#eval-source-map' : ''
  }
}
