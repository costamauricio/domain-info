'use strict';

/**
 * load environment config
 */
require('dotenv').config();

const config = require('config');
const api = require('./api');
const serve = require('koa-static');
const db = require('db');

(async () => {

  api.use(serve('./dist'));

  try {
    await db.connect(config.db.port, config.db.host, config.db.url);
  } catch (err) {
    console.log('Database error:', err);
    process.exit();
  }

  api.listen(config.server.port, () => {
    console.log(`Server running at http://${config.server.host}:${config.server.port}`);
  });
})();
