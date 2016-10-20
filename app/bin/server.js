'use strict';
const path = require('path');
const koa = require('koa');
const promise = require('bluebird');
const logger = require('koa-logger');
const errorhandler = require('koa-errorhandler');
const staticServer = require('koa-static');
const render = require('koa-ejs');
const gzip = require('koa-gzip');
const bodyParser = require('koa-bodyparser');
const routes = require('../routes');
const config = require('../configs/server.conf');

global.Promise = promise;
const app = koa();
app.use(staticServer(path.join(__dirname, '../public')));
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
