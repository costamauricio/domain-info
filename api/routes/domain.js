'use-strict';

const Router = require('koa-router');
const boom = require('koa-boom')();
const whois = require('lib/whois');
const dns = require('lib/dns');
const db = require('db');

const router = new Router({
  prefix: '/domain'
});

router.get('/:domain', async (ctx) => {

  // check domain
  if (ctx.params.domain.trim() == '')
    return boom.badRequest(ctx);

  let param = ctx.params.domain.trim().replace(/^([a-zA-Z]{1,4}:\/\/)?/, '').replace(/\/.*$/, '').toLowerCase(),
    domain = param.match(/\.([a-zA-Z]+)$/),
    whoisServer = null;

  // check if the domain is a CNAME
  let cname = await dns.getCname(param);

  if (cname || param.match(/^www\./))
    param = param.replace(/^[a-zA-Z0-9]+\./, '');

  // check on redis for the domain whois server
  if (domain && await db.exists('server', domain[1]))
    whoisServer = await db.get('server', domain[1]);

  // get the whois domain server and store in redis
  if (!whoisServer) {
    whoisServer = await whois.getServer(param);

    if (!whoisServer)
      return boom.badImplementation(ctx);

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
  if (details.domain.name) {
    details.dns = await dns.getDetails(param);
    details.dns.CNAME = cname;
  }

  ctx.body = details;
});

module.exports = router;
