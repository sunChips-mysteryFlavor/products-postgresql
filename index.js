const express = require('express');
const router = require('./router');
const ghAuth = require('./middleware/ghAuth.js');
const accessToken = require('./middleware/accessTokenAuth.js');

const app = express();
app.use(express.json());

//Github Authorization
app.use(accessToken);
app.use(ghAuth);

app.use('/', router);
app.listen(3020);
console.log(`Listening at http://localhost:3020`);
