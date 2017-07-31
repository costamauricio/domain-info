'use strict';

// global configs
module.exports = Object.freeze({
  environment: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || process.env.PORT
  },
  db: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_URL
  },
  whois: {
    main: process.env.MAIN_WHOIS_SERVER || 'whois.iana.org'
  },
  dns: {
    main: process.env.MAIN_DNS_SERVER || '8.8.8.8'
  }
});
