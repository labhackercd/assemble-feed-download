'use strict';

// node
var path       = require('path');
var fs         = require('fs');

// node_modules
var _          = require('lodash');
var async      = require('async');
var chalk      = require('chalk');
var file       = require('fs-utils');
var request    = require('request');
var progress   = require('request-progress');
var FeedParser = require('feedparser');

// Console colors
var bold       = chalk.bold;
var success    = chalk.green;
var error      = chalk.red;
var info       = chalk.cyan;


var ran = false;

var config = {
  stage: 'options:pre:configuration'
};


var plugin = function(params, callback) {

  var grunt = params.grunt;
  var assemble = params.assemble;
  var download = assemble.options.feeds || {};

  if (grunt.config.get('middleware.feeds.done') === undefined) {
    console.log();
    console.log(bold('  Running:'), '"assemble-contrib-feed-data"');
    console.log(bold('  Stage:  '), '"options:pre:configuration"');
    console.log('\nThis may take a moment, feeds are being downloaded...');
    console.log();

    download = _.extend({
      dest: 'tmp/'
    }, download);

    async.forEach(download.feeds || [], function(feed, next) {
      var req = request(feed.url);
      var dest = file.slashify(path.join(download.dest, feed.dest));

      var streamError = false;

      function handleStreamError(err) {
        streamError = true;
        console.log(error('>> Error:'), err);
        next(err);
      }

      var _counter = 0;
      var items = [];

      progress(request(feed.url))
        .on('progress', function(state) {
          console.log(bold('  received size in bytes'), info(state.received));
          console.log(bold('  percent'), info(state.percent));
          console.log(bold('  percent'), info('100'), success('OK'));
          console.log(bold('  total received (bytes)'), info(state.received));
          console.log();
        })
        .on('error', handleStreamError)
        .on('response', function(resp) {
          if (resp.statusCode != 200) {
            return this.emit('error', new Error('Bad status code'));
          }
        })
        .pipe(new FeedParser())
        .on('error', handleStreamError)
        .on('readable', function() {
          var item = null;
          while (item = this.read()) {
            items.push(item);
          }
        })
        .on('end', function () {
          file.writeDataSync(dest, items);
          console.log(success('>> Created:'), dest + success(' OK'));
          if (!streamError) {
            next();
          }
        });
    }, function (err) {
      grunt.config.set('middleware.feeds.done', true);
      callback();
    });
  } else {
    callback();
  }
};

plugin.options = config;

module.exports = plugin;
