'use strict';

/**
 * load environment config
 */
require('dotenv').config();

const api = require('./api');

(async () => {

  api.listen(8081, () => {
    console.log(`Server running at http://localhost:80801`);
  });
})();
