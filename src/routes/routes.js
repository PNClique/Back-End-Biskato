const routes = require('express').Router();
const { User } = require('../app/models')

User.create({name: 'Edocha', email: 'edocha@gmail.com', profession: 'Programador', address: 'Viana, viana', password: '1234567' })

// const authMiddleware = require('../app/middlewares/authToken');

// const SessionController = require('../app/controllers/index.js')

// definitions routes

// routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);

// routes.get('/dashboard', (req, res) => {
//     return res.status(200).send();
// })


module.exports = routes;