'use-strict';

const Router = require('koa-router');
const whois = require('lib/whois');
const db = require('db');

const router = new Router({
  prefix: '/ip'
});

router.get('/:ip', async (ctx) => {

  let ip = ctx.params.ip.toLowerCase(),
      whoisServer = await whois.getServer(ip);

  let details = {};

  // check on redis for the ip whois information
  if (await db.exists('ip', ip))
    details.ip = await db.get('ip', ip);

  // get the whois ip information from whois server and store in redis
  if (!details.ip) {
    details.ip = await whois.getIpInformation(whoisServer.whois, ip);

    if (details.ip)
      await db.set('ip', ip, details.ip);
  }

  ctx.body = details;
});

module.exports = router;
