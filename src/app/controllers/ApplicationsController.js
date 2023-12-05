const { Op } = require("sequelize");
const moment = require("moment");
const { Applications, Jobs, User } = require("../models");

class ApplicationsController {
  // create a applications
  async create(req, res) {
    const { message, author_id, job_id } = req.body;

    try {
      // taking today's date
      const now = new Date();

      // formanting the  date
      const today = momemt(now).format("YYYY-MM-DD");

      const applications = await Applications.create({
        message: message,
        status: 0,
        date: today,
        author_id: author_id,
        job_id: job_id,
      });

      return res.status(201).send({ applications });
    } catch (error) {
      console.log("Error in create an applications : ", error);
      return res.status(400).send({ error: "Error in create an applications" });
    }
  }

  // update a application
  async update(req, res) {
    const { message, author_id, job_id, status, date } = req.body;

    try {
      const applications = await Applications.update(
        {
          message: message,
          status: status,
          date: date,
          author_id: author_id,
          job_id: job_id,
        },
        {
          returning: true,
          where: { id: req.params.id },
        }
      );

      if (applications[0] === 0) {
        return res
          .status(404)
          .send({ message: "The application with the given id was not found" });
      }
      const application = applications[1][0]; //.dataValues;

      return res.status(200).send({ application });
    } catch (error) {
      console.log("Error in update a application : ", error);
      return res.status(400).send({ error: "Error in update a application" });
    }
  }

  // delete a application
  async delete(req, res) {
    try {
      const application = await Applications.destroy({
        where: { id: req.params.id },
      });
      if (!application) {
        return res
          .status(404)
          .send({ message: "The application with the given id was not found" });
      }
      return res
        .status(200)
        .send({ message: "The application was deleted successfully" });
    } catch (error) {
      console.log("error in deleted a application : ", error);
      return res.status(400).send({ error: "Error in deletedd a application" });
    }
  }

  // get all applications
  async getAllApplications(req, res) {
    try {
      const applications = await Applications.findAll({
        include: [
          { model: Jobs, as: "jobs" },
          { model: User, as: "users" },
        ],
      });

      return res.status(200).send({ applications });
    } catch (error) {
      console.log("Error in get all application : ", error);
      return res.status(400).send({ error: "Error get all applications" });
    }
  }

  // get an Applications by id
  async getApplicationsById(req, res) {
    try {
      const { id } = req.params;
      const applications = await Applications.findOne({
        where: { id: id },
        include: { model: Jobs, as: "jobs" },
      });
      if (!applications) {
        return res.status(404).send({
          message: "The applications with the given id was not found",
        });
      }

      return res.status(200).send({ applications });
    } catch (error) {
      console.log("Error in get an applications by id : ", error);
      return res.status(400).send({ error: "Error get an applications by id" });
    }
  }

  // get a applications by id of the job
  async getApplicationsByJobId(req, res) {
    try {
      const { jobId } = req.params;
      const application = await Applications.findAll({
        where: {
          job_id: jobId,
        },
        include: { model: Jobs, as: "jobs" },
      });

      if (!application) {
        return res.status(404).send({
          message: "The application with the given job id was not found",
        });
      }

      return res.status(200).send({ application });
    } catch (error) {
      console.log("error in get application by job id : ", error);
      return res
        .status(400)
        .send({ error: "error in get application by job id" });
    }
  }
}

module.exports = new ApplicationsController();
