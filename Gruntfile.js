'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    mochaTest: {
      tests: {
        options: {
          reporter: 'progress'
        },
        src: ['tests/**/*_test.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
