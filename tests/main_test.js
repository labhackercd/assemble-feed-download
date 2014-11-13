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
      var assemble = {
        config: {
          'feed-data': {
            dest: 'tests/actual/feeds/',
            feeds: [
              { url: 'https://github.com/ravishi.atom', //'file://' + __dirname + '/actual/feeds/ravishi.atom',
                dest: 'test.json'}
            ]
          },
          grunt: grunt
        }
      };

      var params = {
        event: 'assemble:before:configuration'
      };

      function doTheTesting() {
        done();
      }

      plugin(assemble)['assemble-feed-data'](params, doTheTesting);
    });
  });
});
