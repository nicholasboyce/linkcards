const csrfRouter = require('express').Router();
const csrfController = require('../controllers/csrf');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173'
};

csrfRouter.get('/', cors(corsOptions), csrfController.getToken);

module.exports = csrfRouter;