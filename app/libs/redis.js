const redis = require('redis');
const config = require('../config/server.conf');

const REDIS_USER_PREFIX = 'server_module_';

const redisClient = redis.createClient(config.redis);

redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

redisClient.on('connect', () => {
  console.log(`redis connection open to ${config.redis}`);
});

// 获取redis 缓存
export function getUserRedis(id) {
  return new Promise((resolve) => {
    redisClient.get(REDIS_USER_PREFIX + id, (err, v) => {
      if (!err) {
        resolve(JSON.parse(v));
      }
    });
  });
}

// 设置redis 缓存
export function setUserRedis(id, data, exp) {
  const Data = JSON.stringify(data);
  return new Promise((resolve) => {
    redisClient.set(REDIS_USER_PREFIX + id, Data, (err, v) => {
      if (!err && v) {
        resolve(v);
      }
    });
    // 设置redis 过期时间 10s
    redisClient.expire(REDIS_USER_PREFIX + id, exp || 10);
  });
}

export default redisClient;
