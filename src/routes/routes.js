const routes = require("express").Router();

// config multer and firebase
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = require("../services/firebase.js");

// config middlewares
const authMiddleware = require("../app/middlewares/authToken");

// config controllers
const UserController = require("../app/controllers/UserController");
const JobsController = require("../app/controllers/JobsController");

// definitions routes

// definitions of routes of the authentication and register
routes.post("/auth", UserController.auth);
routes.post("/register", UserController.register);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});

// definitions of routes of the user
routes.put(
  "/user/update/:id",
  upload.single("image"),
  uploadFile,
  UserController.update
);
routes.get("/users", UserController.getAllJUsers);
routes.get("/user/:id", UserController.getUserById);
routes.get("/user/search/:search", UserController.searchUsers);

// definitions of routes of the jobs (biskatos)
routes.post("/job", JobsController.create);
routes.put("/job/:id", JobsController.update);
routes.delete("/job/:id", JobsController.delete);
routes.get("/jobs", JobsController.getAllJobs);
routes.get("/job/:id", JobsController.getJobsById);
routes.get("/job/author/:authorId", JobsController.getJobsByAuthorId);
routes.get("/job/search/:search", JobsController.searchJobs);

module.exports = routes;
