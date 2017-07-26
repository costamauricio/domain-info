'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const router = new Router({
  prefix: '/api'
});

router.use( require('./routes/domain').routes() );

app.use(router.routes());

module.exports = app;
