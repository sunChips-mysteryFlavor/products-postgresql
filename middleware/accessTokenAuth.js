const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const key = 'rrMbJsGJ4Pxxs0SVn8lfFzzeIhp8LQEJ';

module.exports = (req, res, next) => {
  const [ivBase64, encryptedData] = req.headers.authorization.split('|');
  const iv = Buffer.from(ivBase64, 'base64');
  console.log(iv, encryptedData, 'here');

  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  req.decryptedKey = decrypted;

  next();
};
