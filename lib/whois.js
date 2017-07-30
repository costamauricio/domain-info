'use strict';

const config = require('config');
const net = require('net');
const parser = require('parse-whois');

/**
 * Open a socket to the specific whois server
 *
 * @param string whoisServer
 * @param string data - Data to send to the server
 * @return string
 */
function serverRequest(whoisServer, data) {
  return new Promise((resolve, reject) => {

    let received = '';

    let conn = net.createConnection(43, whoisServer, () => {
      conn.write(data + '\r\n');
    });

    conn.on('data', (data) => {
      received += data;
    });

    conn.on('close', (err) => {

      if (err)
        return reject(received);

      resolve(received);
    });
  });
}

module.exports = {

  async getServer(req) {
    let info = await serverRequest(config.whois.main, req);

    let whoisServer = parser.parseWhoIsData(info).filter((item) => {
      return ['domain', 'whois', 'status'].includes(item.attribute);
    }).reduce((prev, curr) => {
      prev[curr.attribute] = curr.value;
      return prev;
    }, {});

    if (!whoisServer.whois)
      return null;

    return whoisServer;
  },

  async getDomainInformation(server, domain) {

    let info = await serverRequest(server, domain);

    let details = {
      name: '',
      raw: info
    };

    parser.parseWhoIsData(info).map((item) => {
      item.attribute = item.attribute.trim().toLowerCase();

      if (['domain name', 'domain'].includes(item.attribute))
        details.name = item.value;
    });

    return details;
  },

  async getIpInformation(server, ip) {
    return await serverRequest(server, ip);
  }
};
