const redis = require('redis');

const connData = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
}

const client = redis.createClient(connData);

module.exports = client;
