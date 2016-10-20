'use strict';
var Router = require('koa-router');
var routes = new Router();
routes.get('/', function* () {
  yield this.render('index', {
    text: 'hello wold!',
  });
});

module.exports = routes;
