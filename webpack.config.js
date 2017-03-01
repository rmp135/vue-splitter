module.exports = {
  entry: "./src/vue-splitter.vue",
  output: {
    filename: "dist/vue-splitter.js",
    library: "VueSplitterComp",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.vue$/, use: [
        {
          loader: "vue-loader",
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader',
              js: 'babel-loader'
            }
          }
        }
      ]},
      { test: /\.js$/, loaders: 'babel-loader' },
      { test: /\.css$/, loaders: 'style-loader!css-loader' }
    ]
  }
}