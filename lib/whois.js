'use strict';

const net = require('net');
const parser = require('parse-whois');

function serverConsult(whoisServer, data) {
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

    let info = await serverConsult('whois.iana.org', host);

    return info;
  }
};
