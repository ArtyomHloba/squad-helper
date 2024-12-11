const express = require('express');
const cors = require('cors');
const router = require('./router');
const handlerError = require('./handlerError/handler');
const { logger } = require('./middlewares/basicMiddlewares');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);
app.use(logger);

module.exports = app;
