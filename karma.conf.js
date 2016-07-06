// Karma configuration
// Generated on Tue Mar 08 2016 16:33:56 GMT+0100 (CET)
var path = require('path');

module.exports = function(config) {
  
  config.set({
    
    //Browser in which will be tested
    browsers: [ 'PhantomJS' ],
        
    //Select which testing frameworks to use
    frameworks: ['jasmine' ],
    
    //Files to load
    files: [
      {
        pattern: './tests.webpack.js', watched: false
      }
    ],
    
    //Plugins to load (karma-coverage, karma-chome-loader...)
    plugins: [ 'karma-*' ],
    
    //preprocess with webpack
    preprocessors: {
      'tests.webpack.js': [ 'webpack'] 
    },
    
    //Reporters to format output 
    reporters: [ 'mocha', 'coverage', 'threshold' ], //report results in this format

    //Run only once
    singleRun: false,
    
    //Webpack config for karma run:
    //  -Resolve is needed for require resolutions (same as webpack.config)
    //  -Only istanbul preloader for .js file, not spec files.
    webpack: {
      resolve: {
        extensions: ['', '.js', '.sass']
      },  

      module: {
        preLoaders: [{
          test: /.js$/,
          include: path.resolve('js/'),
          exclude: /(.spec)/,
          loader: 'istanbul-instrumenter'
        }]
      }    
    },
    
    //Remove webpack info from the console
    webpackMiddleware: {
      noInfo: true 
    },
    
    //Coverage reporter config
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage/', //path to created html doc
    }
    
  });
  
};
