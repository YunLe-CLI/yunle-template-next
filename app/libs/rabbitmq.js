const amqp = require('amqplib/callback_api');
const config = require('../configs/server.conf');

module.exports = new Promise((resolve) => {
  amqp.connect(config.amqp, (err, conn) => {
    if (err) return;
    resolve(conn);
  });
});
