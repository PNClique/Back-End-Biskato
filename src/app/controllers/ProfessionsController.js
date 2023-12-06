const { Professions, User } = require("../models");

class ProfessionsController {
  // create an profession
  async create(req, res) {
    const { title, description, author_id } = req.body;

    try {
      const profession = await Professions.create({
        title: title,
        description: description,
        author_id: author_id,
      });

      return res.status(201).send({ profession });
    } catch (error) {
      console.log("Error in create an profession : ", error);
      return res.status(400).send({ error: "Error in create an profession" });
    }
  }

  // update an profession
  async update(req, res) {
    const { title, description, author_id } = req.body;

    try {
      const professions = await Professions.update(
        {
          title: title,
          description: description,
          author_id: author_id,
        },
        {
          returning: true,
          where: { id: req.params.id },
        }
      );

      if (professions[0] === 0) {
        return res
          .status(404)
          .send({ message: "The profession with the given id was not found" });
      }
      const profession = professions[1][0];

      return res.status(200).send({ profession });
    } catch (error) {
      console.log("Error in update an profession : ", error);
      return res.status(400).send({ error: "Error in update an profession" });
    }
  }

  // delete an profession
  async delete(req, res) {
    try {
      const profession = await Professions.destroy({
        where: { id: req.params.id },
      });
      if (!profession) {
        return res
          .status(404)
          .send({ message: "The profession with the given id was not found" });
      }
      return res
        .status(200)
        .send({ message: "The profession was deleted successfully" });
    } catch (error) {
      console.log("error in deletedd an profession : ", error);
      return res.status(400).send({ error: "Error in deletedd an profession" });
    }
  }

  // get all profession of the user
  async getAllProfessionOfTheUser(req, res) {
    try {
      const profession = await profession.findAll({
        where: { author_id: req.params.authorId },
        include: { model: User, as: "author" },
      });

      return res.status(200).send({ profession });
    } catch (error) {
      console.log("Error in get all profession of the user : ", error);
      return res.status(400).send({ error: "Error get all profession of the user" });
    }
  }

  // get an profession by id
  async getprofessionById(req, res) {
    try {
      const { id } = req.params;
      const profession = await Professions.findOne({
        where: { id: id },
        include: { model: User, as: "author" },
      });
      if (!profession) {
        return res
          .status(404)
          .send({ message: "The profession with the given id was not found" });
      }

      return res.status(200).send({ profession });
    } catch (error) {
      console.log("Error in get an profession by id : ", error);
      return res.status(400).send({ error: "Error get an profession by id" });
    }
  }

  // get an requeriment by id of the job
  async getRequerimentByJobId(req, res) {
    try {
      const { jobId } = req.params;
      const requeriment = await Professions.findAll({
        where: {
          job_id: jobId,
        },
        include: { model: Jobs, as: "jobs" },
      });

      if (!requeriment) {
        return res.status(404).send({
          message: "The requeriment with the given job id was not found",
        });
      }

      return res.status(200).send({ requeriment });
    } catch (error) {
      console.log("error in get requeriment by job id : ", error);
      return res
        .status(400)
        .send({ error: "error in get requeriment by job id" });
    }
  }
}

module.exports = new ProfessionsController();
