'use strict';

var expect = require('chai').expect;
var grunt = require('grunt');
var plugin = require('../');

describe('assemble-feed-download', function() {

  this.timeout(5000);

  describe('when given a feed', function() {

    before(function() {
      grunt.config.set('plugin.feeds.done', undefined);
    });

    it('should collect the feed into a data file', function(done) {
      var params = {
        stage: 'options:pre:configuration',
        assemble: {
          options: {
            feeds: [
              { url: 'https://github.com/ravishi.atom',
                dest: 'tests/actual/feeds/test.json'}
            ]
          }
        },
        grunt: grunt
      };

      function doTheTesting() {
        done();
      }

      plugin(params, done);
    });
  });
});
