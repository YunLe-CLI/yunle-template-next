const Router = require('koa-router');
const proxy = require('koa-proxy');
const config = require('../config/server.conf');
const routes = new Router();

routes.get('/', function* () {
  yield this.render('index', {
    text: 'hello wold!',
  });
});

// 代理路由
config.proxys.map((item) => {
  routes.all(item.path, proxy({
    host: item.host,
    map(path) {
      return path.replace(item.path, item.pathRewrite[`^${item.path}`]);
    },
  }));
  routes.all(`${item.path}/*`, proxy({
    host: item.host,
    map(path) {
      return path.replace(item.path, item.pathRewrite[`^${item.path}`]);
    },
  }));
});

// 路由设置
config.router.map((item) => {
  routes.all(item.route, function* () {
    item.handle(null, null, this);
  });
});

module.exports = routes;
