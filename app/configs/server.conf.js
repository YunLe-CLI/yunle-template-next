'use strict';
const path = require('path');

const NODE_ENV = process.env.NODE_ENV === 'production';
let host = 'localhost';
if (NODE_ENV) {
  host = 'usersMongo';
}

module.exports = {
  env: !NODE_ENV,
  port: NODE_ENV ? 1337 : 5000,
  proxy: {
    host: 'https://www.baidu.com/',
    path: '/s',
  },
  render: {
    root: path.join(__dirname, '../view'),
    layout: false,
    viewExt: 'html',
    cache: NODE_ENV,
    debug: !NODE_ENV,
    delimiter: '%',
  },
  mongodb: `mongodb://${host}:27017/yunle`,
  redis: `redis://${host}:6379`,
  amqp: 'amqp://localhost:5672',
};
