const { babel } = require('@rollup/plugin-babel')
const terser = require('@rollup/plugin-terser')
// const version = process.env.VERSION || require('./package.json').version

module.exports = {
  input: 'src/index.js',
  plugins: [babel(), terser()],
  output: {
    file: 'dist/dom-mark.js',
    format: 'umd',
    name: 'DomMark',
    exports: 'default'
  }
}
