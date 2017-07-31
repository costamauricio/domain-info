'use strict';

const config = require('config');
const dns = require('dns');
const bluebird = require('bluebird');

const resolve = bluebird.promisify(dns.resolve);

module.exports = {

  // check if the domain is a CNAME
  async getCname(domain) {
    dns.setServers([config.dns.main]);

    let cname = null;

    try {
      cname = await resolve(domain, 'CNAME');
    } catch(err) {}

    return cname;
  },

  // get the DNS information for the domain
  async getDetails(domain) {
    dns.setServers([config.dns.main]);

    let nservers = await resolve(domain, 'NS');
    let address = await resolve(nservers[0]);

    dns.setServers(address);

    let details = {
      NS: nservers
    };

    try {
      details.A = await resolve(domain, 'A');
    } catch(err) {}

    try {
      details.AAAA = await resolve(domain, 'AAAA');
    } catch(err) {}

    return details;
  }
};
