var path = require('path');

let host = 'localhost';
if (process.env.NODE_ENV === 'production') {
  host = 'usersMongo';
}

module.exports = {
  port: 8080,
  render: {
    root: path.join(__dirname, '../view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true,
    delimiter: '%'
  },
  mongodb: `mongodb://${host}:27017/yunle`,
  redis: `redis://${host}:6379`,
  amqp: 'amqp://localhost:5672',
}
