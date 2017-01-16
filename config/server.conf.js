const path = require('path');
const config = require('../_config.js');

const NODE_ENV = process.env.NODE_ENV || 'development';
const theme = config.theme;
const rootPath = path.join(__dirname, '../themes', theme, 'dist/assets');
const themeConfig = require(path.join(__dirname, '../themes', theme, 'config/server.config.js')) || {};

module.exports = {
  env: NODE_ENV,
  port: 8080,
  proxys: themeConfig.proxys.pro || [],
  router: themeConfig.router.pro || [],
  public: rootPath,
  render: {
    root: rootPath,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true,
    delimiter: '%',
  },
};
