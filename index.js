const express = require('express');
const router = require('./router');
const accessToken = require('./middleware/accessTokenAuth.js');

const app = express();
app.use(express.json());

//Github Authorization
app.use(accessToken);

app.use('/', router);
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
