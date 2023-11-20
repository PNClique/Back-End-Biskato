const routes = require('express').Router();
const { User } = require('../app/models')


const authMiddleware = require('../app/middlewares/authToken');

const UserController = require('../app/controllers/UserController')

// definitions routes

routes.post('/auth', UserController.auth);
routes.post('/register', UserController.register);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})


module.exports = routes;