'use strict';
const Router = require('koa-router');
const proxy = require('koa-proxy');
const config = require('../configs/server.conf');
const GraphQL = require('graphql');
const schema = require('../controller/GraphQL');

const graphql = GraphQL.graphql;
const routes = new Router();
routes.get('/', function* () {
  yield this.render('index', {
    text: 'hello wold!',
  });
});

// graphql路由
routes.all('/graphql', function* () {
  const query = this.query.query;
  const resp = yield graphql(schema, query);
  this.body = resp;
});
// 代理路由
routes.all(`${config.proxy.path}`, proxy({
  host: config.proxy.host,
}));
routes.all(`${config.proxy.path}/*`, proxy({
  host: config.proxy.host,
}));
module.exports = routes;
