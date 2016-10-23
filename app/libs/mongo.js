'use strict';
const mongoose = require('mongoose');
const config = require('../config/server.conf');

mongoose.Promise = global.Promise;
// 连接
mongoose.connect(config.mongodb);
mongoose.set('debug', config.env);
// 连接成功
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${config.mongodb}`);
});
// 连接异常
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
