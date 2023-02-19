const axios = require('axios');

module.exports = {
  getAll: (extension) =>
    axios({
      method: 'get',
      url: options.url + extension,
      headers: options.headers,
    }),
};
