'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// mount api routes
const router = new Router({
  prefix: '/api'
});

// load domain routes
router.use( require('./routes/domain').routes() );
router.use( require('./routes/ip').routes() );

app.use(router.routes());

module.exports = app;
