'use strict';
const Mock = require('mockjs');

module.exports = function(routes) {
  routes.get('/api/mock/test', function* () {
    this.body = Mock.mock({
      data: {
        'list|0-10': [
          {
            'id|+1': 0
          }
        ]
      },
      status: 200,
      message: "",
      serverTime: '@now'
    });
  });
}
