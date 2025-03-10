const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const redis = require('redis')
const session = require('express-session')
const { rateLimit } = require('express-rate-limit')
const loginRouter = require('./src/routes/login')
const userRouter = require('./src/routes/users')
const csrfRouter = require('./src/routes/csrf')
const logoutRouter = require('./src/routes/logout')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const passport = require('passport')
const { csrfSync } = require("csrf-sync")
const {
  csrfSynchronisedProtection
} = csrfSync();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const RedisStore = require('connect-redis').default
const redisClient = redis.createClient({
  url: `${config.REDIS_URL}`
});
redisClient.connect().catch(console.error);

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
app.use(session(
  {
    name: 'sessionId',
    store: new RedisStore({ client: redisClient }),
    secret: config.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax',
      httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));
app.use(middleware.requestLogger);

// app.use(limiter);
app.use('/api/csrf', csrfRouter);
app.use(csrfSynchronisedProtection);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/users', userRouter);

app.get('(/*)?', async (req, res, next) => {
  res.sendFile('dist/index.html', { root: __dirname });
});


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app