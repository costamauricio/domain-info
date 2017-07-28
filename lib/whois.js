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

  async getInformation(host) {

    let info = await serverRequest(config.whois.main, host);

    let whoisServer = parser.parseWhoIsData(info).filter((item) => {
      return ['domain', 'whois', 'status'].includes(item.attribute);
    }).reduce((prev, curr) => {
      prev[curr.attribute] = curr.value;
      return prev;
    }, {});

    info = await serverRequest(whoisServer.whois, host);

    return [parser.parseWhoIsData(info), info];
  }
};
