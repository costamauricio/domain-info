'use-strict';

const Router = require('koa-router');
const whois = require('lib/whois');
const db = require('db');

const router = new Router({
  prefix: '/domain'
});

router.get('/:domain', async (ctx) => {

  let info = await whois.getInformation(ctx.params.domain);

  ctx.body = {
    info: info
  };
});

module.exports = router;
