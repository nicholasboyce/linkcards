const logger = require('./logger')

const requestLogger = (request, _, next) => {
  const { headers } = request;
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('Session ID: ', request.session.id)
  logger.info('IP: ', request.ip)
  logger.info('Real IP: ', headers['X-Real-IP'])
  logger.info('---')
  next()
}

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'username already exists' })
  } else if (error.name === 'JsonWebTokenError') {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  } else if (error.name === 'InvalidCredentialsError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'ForbiddenError') {
    return response.status(403).json({ error: error.message })
  } else if (error.name === 'ZodError') {
    // console.log(error.message)
    return response.status(400).send({ error: 'bad data' })
  }

  next(error)
}

function validateData(schema) {
  return (request, _, next) => {
      request.body = schema.parse(request.body)
      next()
  };
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  validateData
}