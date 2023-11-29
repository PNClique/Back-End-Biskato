const routes = require('express').Router();
const { User } = require('../app/models')


const authMiddleware = require('../app/middlewares/authToken');

const UserController = require('../app/controllers/UserController')
const JobsController = require('../app/controllers/JobsController')

// definitions routes

// definitions of routes of the authentication and register
routes.post('/auth', UserController.auth);
routes.post('/register', UserController.register);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})

// definitions of routes of the jobs (biskatos)
routes.post('/job', JobsController.create);
routes.put('/job/:id', JobsController.update);
routes.delete('/job/:id', JobsController.delete);
routes.get('/jobs', JobsController.getAllJobs);
routes.get('/job/:id', JobsController.getJobsById);
routes.get('/job/author/:authorId', JobsController.getJobsByAuthorId);
routes.get('/job/search/:search', JobsController.searchJobs);

module.exports = routes;