'use strict';

var expect = require('chai').expect;
var grunt = require('grunt');
var plugin = require('../');

describe('assemble-contrib-feed-data', function() {

  this.timeout(5000);

  describe('when given a feed', function() {

    before(function() {
      grunt.config.set('plugin.feed-data.done', undefined);
    });

    it('should collect the feed into a data file', function(done) {
      var params = {
        stage: 'options:pre:configuration',
        assemble: {
          options: {
            'feed-data': {
              dest: 'tests/actual/feeds/',
              feeds: [
                { url: 'https://github.com/ravishi.atom', //'file://' + __dirname + '/actual/feeds/ravishi.atom',
                  dest: 'test.json'}
              ]
            }
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
