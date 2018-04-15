const webpackConfig = require('./webpack.config.js');
delete webpackConfig.output.libraryTarget;

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    reporters: ['dots'],
    files: [
      './src/tests.js'
    ],
    preprocessors: {
      'src/tests.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}