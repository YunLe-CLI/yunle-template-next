'use strict';
var koa = require('koa');
var Promise = require('bluebird');
var logger = require('koa-logger');
var errorhandler = require('koa-errorhandler');
var render = require('koa-ejs');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var routes = require('../routes');
var config = require('../configs/server.conf');
global.Promise = Promise;
var app = koa();
render(app, config.render);
app.use(errorhandler());
app.use(logger());
app.use(bodyParser());
app.use(gzip());
app.use(routes.middleware());
app.listen(config.port || 8080, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(
      `==> 🌎  Listening on ${config.port || 8080}` +
      ` Open up http://localhost:${config.port || 8080}/ in your browser.`
    );
  }
});
