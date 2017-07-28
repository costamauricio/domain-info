'use strict';

const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {

  client: null,

  /**
   * Connect to redis server
   */
  connect(port, host) {

    return new Promise((resolve, reject) => {
      this.client = redis.createClient(port, host);

      this.client.on('connect', () => {
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  },

  async exists(hash, key) {
    let exists = await this.client.hexistsAsync(hash, key);
    return exists == 1;
  },

  async set(hash, key, value) {

    if (typeof value == 'object')
      value = JSON.stringify(value)

    return await this.client.hsetAsync(hash, key, value);
  },

  async get(hash, key) {
    let value = await this.client.hgetAsync(hash, key);

    try {
      let object = JSON.parse(value);

      return object;
    } catch(err) {
      return value;
    }
  }
};
