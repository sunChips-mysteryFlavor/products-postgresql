const axios = require('axios');

module.exports = (req, res, next) => {
  axios
    .get('https://api.github.com/orgs/hackreactor/teams/students-rfp2212', {
      headers: {
        Authorization: `token ${req.decryptedKey}`,
      },
    })
    .then((res) => {
      console.log('Authenticated');
      return next();
    })
    .catch((err) => {
      // console.log(errsr);
      var err = new Error('Not authorized! Go back!');
      err.status = 420;
      return next(err);
    });
};
