const { Requeriments, Jobs } = require("../models");

class RequerimentsController {
  // create an requeriments
  async create(req, res) {
    const { name, job_id } = req.body;

    try {
      const requeriments = await Requeriments.create({
        name: name,
        job_id: job_id,
      });

      return res.status(201).send({ requeriments });
    } catch (error) {
      console.log("Error in create an requeriments : ", error);
      return res.status(400).send({ error: "Error in create an requeriments" });
    }
  }

  // update an requeriments
  async update(req, res) {
    const { name, job_id } = req.body;

    try {
      const requeriments = await Requeriments.update(
        {
          name: name,
          job_id: job_id,
        },
        {
          returning: true,
          where: { id: req.params.id },
        }
      );

      if (requeriments[0] === 0) {
        return res
          .status(404)
          .send({ message: "The requeriment with the given id was not found" });
      }
      const requeriment = requeriments[1][0]; //.dataValues;

      return res.status(200).send({ requeriment });
    } catch (error) {
      console.log("Error in update an requeriment : ", error);
      return res.status(400).send({ error: "Error in update an requeriment" });
    }
  }

  // delete an requeriments
  async delete(req, res) {
    try {
      const requeriment = await Requeriments.destroy({
        where: { id: req.params.id },
      });
      if (!requeriment) {
        return res
          .status(404)
          .send({ message: "The requeriment with the given id was not found" });
      }
      return res
        .status(200)
        .send({ message: "The requeriment was deleted successfully" });
    } catch (error) {
      console.log("error in deletedd an requeriment : ", error);
      return res
        .status(400)
        .send({ error: "Error in deletedd an Requeriment" });
    }
  }

  // get all requeriments
  async getAllRequeriments(req, res) {
    try {
      const requeriments = await Requeriments.findAll({
        include: { model: Jobs, as: "jobs" },
      });

      return res.status(200).send({ requeriments });
    } catch (error) {
      console.log("Error in get all requeriments : ", error);
      return res.status(400).send({ error: "Error get all job" });
    }
  }

  // get an requeriments by id
  async getRequerimentsById(req, res) {
    try {
      const { id } = req.params;
      const requeriments = await Requeriments.findOne({
        where: { id: id },
        include: { model: Jobs, as: "jobs" },
      });
      if (!requeriments) {
        return res
          .status(404)
          .send({ message: "The requeriments with the given id was not found" });
      }

      return res.status(200).send({ requeriments });
    } catch (error) {
      console.log("Error in get an requeriments by id : ", error);
      return res.status(400).send({ error: "Error get an requeriments by id" });
    }
  }

  // get an requeriment by id of the job
  async getRequerimentByJobId(req, res) {
    try {
      const { jobId } = req.params;
      const requeriment = await Requeriments.findAll({
        where: {
          job_id: jobId,
        },
        include: { model: Jobs, as: "jobs" },
      });

      if (!requeriment) {
        return res
          .status(404)
          .send({ message: "The requeriment with the given job id was not found" });
      }

      return res.status(200).send({ requeriment });
    } catch (error) {
      console.log("error in get requeriment by job id : ", error);
      return res.status(400).send({ error: "error in get requeriment by job id" });
    }
  }
}

module.exports = new RequerimentsController();
