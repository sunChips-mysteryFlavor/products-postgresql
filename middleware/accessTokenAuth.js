const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const key = 'rrMbJsGJ4Pxxs0SVn8lfFzzeIhp8LQEJ';

module.exports = (req, res, next) => {
  let decipher = crypto.createDecipheriv(algorithm, key, req.encryptedKey.iv);

  let decrypted = decipher.update(
    req.encryptedKey.encryptedData,
    'utf8',
    'hex',
  );
  decrypted += decipher.final('hex');

  next();
};
