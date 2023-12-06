const { Op } = require("sequelize");
const { Jobs, User, Requeriments } = require("../models");

class JobsController {
  // create an jobs (biskato)
  async create(req, res) {
    const {
      title,
      image,
      description,
      address,
      remuneration,
      requeriments,
      responsibility,
      author_id,
    } = req.body;

    try {
      const jobs = await Jobs.create({
        title: title,
        image: image,
        description: description,
        address: address,
        remuneration: remuneration,
        requeriments: requeriments,
        responsibility: responsibility,
        author_id: author_id,
      });

      return res.status(201).send({ jobs });
    } catch (error) {
      console.log("Error in create an jobs : ", error);
      return res.status(400).send({ error: "Error in create an jobs" });
    }
  }

  // update an jobs (biskato)
  async update(req, res) {
    const {
      title,
      image,
      description,
      address,
      remuneration,
      requeriments,
      responsibility,
      author_id,
    } = req.body;

    try {
      const jobs = await Jobs.update(
        {
          title: title,
          image: image,
          description: description,
          address: address,
          remuneration: remuneration,
          requeriments: requeriments,
          responsibility: responsibility,
          author_id: author_id,
        },
        {
          returning: true,
          where: { id: req.params.id },
        }
      );

      if (jobs[0] === 0) {
        return res
          .status(404)
          .send({ message: "The Job with the given id was not found" });
      }
      const job = jobs[1][0]; //.dataValues;

      return res.status(200).send({ job });
    } catch (error) {
      console.log("Error in update an job : ", error);
      return res.status(400).send({ error: "Error in update an job" });
    }
  }

  // delete an job
  async delete(req, res) {
    try {
      const job = await Jobs.destroy({ where: { id: req.params.id } });
      if (!job) {
        return res
          .status(404)
          .send({ message: "The job with the given id was not found" });
      }
      return res
        .status(200)
        .send({ message: "The job was deleted successfully" });
    } catch (error) {
      console.log("error in deletedd an job : ", error);
      return res.status(400).send({ error: "Error in deletedd an job" });
    }
  }

  // get all jobs
  async getAllJobs(req, res) {
    try {
      const jobs = await Jobs.findAll({
        include: [
          { model: Requeriments, as: "requeriments" },
          { model: User, as: "author" },
        ],
      });

      return res.status(200).send({ jobs });
    } catch (error) {
      console.log("Error in get all jobs : ", error);
      return res.status(400).send({ error: "Error get all job" });
    }
  }

  // get an jobs by id
  async getJobsById(req, res) {
    try {
      const { id } = req.params;
      const job = await Jobs.findOne({
        where: { id: id },
        include: [
          { model: Requeriments, as: "requeriments" },
          { model: User, as: "author" },
        ],
      });
      if (!job) {
        return res
          .status(404)
          .send({ message: "The job with the given id was not found" });
      }

      return res.status(200).send({ job });
    } catch (error) {
      console.log("Error in get an job by id : ", error);
      return res.status(400).send({ error: "Error get an job by id" });
    }
  }

  // get an job by id of the author
  async getJobsByAuthorId(req, res) {
    try {
      const { authorId } = req.params;
      const job = await Jobs.findAll({
        where: {
          author_id: authorId,
        },
        include: [
          { model: Requeriments, as: "requeriments" },
          { model: User, as: "author" },
        ],
      });

      if (!job) {
        return res
          .status(404)
          .send({ message: "The job with the given author id was not found" });
      }

      return res.status(200).send({ job });
    } catch (error) {
      console.log("error in get jobs by author id : ", error);
      return res.status(400).send({ error: "error in get jobs by author id" });
    }
  }

  // search jobs by title or address
  async searchJobs(req, res) {
    try {
      const { search } = req.params;
      const job = await Jobs.findAll({
        where: {
          [Op.or]: [{ title: search }, { address: search }],
        },
        include: [
          { model: Requeriments, as: "requeriments" },
          { model: User, as: "author" },
        ],
      });

      if (!job) {
        return res.status(404).send({
          message: "The job with the given title or address was not found",
        });
      }

      return res.status(200).send({ job });
    } catch (error) {
      console.log(
        "error in filter job with the given title or address : ",
        error
      );
      return res.status(400).send({
        error: "error in filter job with the given title or address",
      });
    }
  }
}

module.exports = new JobsController();
