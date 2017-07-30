'use-strict';

const Router = require('koa-router');
const whois = require('lib/whois');
const dns = require('lib/dns');
const db = require('db');

const router = new Router({
  prefix: '/domain'
});

router.get('/:domain', async (ctx) => {

  let param = ctx.params.domain.trim().replace(/^(http:\/\/)?(www\.)?/, '').replace(/\/?$/, '').toLowerCase(),
      domain = param.match(/\.([a-zA-Z]+)$/),
      whoisServer = null;

  // check on redis for the domain whois server
  if (domain && await db.exists('server', domain[1]))
    whoisServer = await db.get('server', domain[1]);

  // get the whois domain server and store in redis
  if (!whoisServer) {
    whoisServer = await whois.getServer(param);

    if (!whoisServer)
      return ctx.status = 500;

    await db.set('server', whoisServer.domain.toLowerCase(), whoisServer);
  }

  let details = {};

  // check on redis for the domain whois information
  if (await db.exists('domain', param)) {
    details.domain = await db.get('domain', param);
  }

  // get the whois domain information from whois server and store in redis
  if (!details.domain) {
    details.domain = await whois.getDomainInformation(whoisServer.whois, param);

    if (details.domain.name)
      await db.set('domain', details.domain.name.toLowerCase(), details.domain);
  }

  // find dns information for the domain
  if (details.domain.name)
    details.dns = await dns.getDetails(param);

  ctx.body = details;
});

module.exports = router;
