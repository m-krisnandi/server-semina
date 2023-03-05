var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const categoriesRouter = require('./app/api/v1/categories/router');
const imagesRouter = require('./app/api/v1/images/router');
const talentsRouter = require('./app/api/v1/talents/router');
const eventsRouter = require('./app/api/v1/events/router');
const organizersRouter = require('./app/api/v1/organizers/router');
const authCMSRouter = require('./app/api/v1/auth/router');
const ordersRouter = require('./app/api/v1/orders/router');
const participantsRouter = require('./app/api/v1/participants/router');

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/handler-error');

const v1 = '/api/v1';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}`, participantsRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
