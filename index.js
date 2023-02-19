const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());

//Github Authorization
// app.use(ghAuth);
// app.use(accessToken);

app.use('/', router);
app.listen(3020);
console.log(`Listening at http://localhost:3020`);
