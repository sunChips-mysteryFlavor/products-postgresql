const crypto = require('crypto');

const algorithm = process.env.MW_AUTH_ALGORITHM;

const key = process.env.MW_AUTH_KEY;

//Decrypt
module.exports = (req, res, next) => {
  try {
    const [ivBase64, encryptedData] = req.headers.authorization.split('|');
    const iv = Buffer.from(ivBase64, 'base64');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    if (decrypted === process.env.MW_AUTH_SECRET) {
      console.log('Authenticated');
      return next();
    } else {
      var err = new Error('Not authorized! Go back!');
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    var err = new Error('Invalid Authorization!');
    err.status = 404;
    return next(err);
  }
};
