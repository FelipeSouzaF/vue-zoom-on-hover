import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
  banner: true,
  bundleNodeModules: true,
  output: {
    extractCSS: false,
    target: "browser",
    format: [
      "cjs",
      "cjs-min",
      "esm",
      "esm-min"
    ]
  },
  plugins: {
    commonjs: commonjs(),
    vue: {
      css: true
    }
  }
}