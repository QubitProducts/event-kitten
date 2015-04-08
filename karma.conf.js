module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify', 'expect', 'sinon'],
    files: [
      'test/*.js'
    ],
    exclude: [
      'karma.conf.js'
    ],
    preprocessors: {
      'test/*.js': ['browserify'],
      'lib/*.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    reporters: ['spec'],
    logLevel: config.LOG_INFO,
    browsers: ['Chrome']
  })
}
