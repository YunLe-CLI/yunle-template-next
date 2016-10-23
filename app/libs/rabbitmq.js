const amqp = require('amqplib/callback_api');
const config = require('../../config/server.conf');

module.exports = new Promise((resolve) => {
  amqp.connect(config.amqp, (err, conn) => {
    if (err) return;
    resolve(conn);
  });
});
