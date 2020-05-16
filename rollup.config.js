const babel = require('rollup-plugin-babel')
const { uglify } = require('rollup-plugin-uglify')
const version = process.env.VERSION || require('./package.json').version

module.exports = {
  input: 'src/index.js',
  plugins: [babel(), uglify({
    output: {
      preamble: `/**
* @funinps/dom-mark v${version}
* https://github.com/funinps/dom-mark
* (c) ${new Date().toLocaleDateString()} @dongnaebi
* @license MIT
*/`
    }
  })],
  output: {
    file: 'dist/dom-mark.js',
    format: 'umd',
    name: 'DomMark',
    exports: 'default'
  }
}
