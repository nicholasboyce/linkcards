const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const session = require('express-session')
const cors = require('cors')
const loginRouter = require('./src/routes/login')
const userRouter = require('./src/routes/users')
const logoutRouter = require('./src/routes/logout')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  });
app.use(express.json());
app.use(session({
    secret: config.SECRET,
    saveUninitialized: false,
    resave: true
}));
app.use(express.static('dist'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/users', userRouter);


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app