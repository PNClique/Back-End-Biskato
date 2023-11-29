require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.express.use(express.json());
    // parse requests of content-type - application/json
    // this.express.use(bodyParser.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    // this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use(express.static(__dirname + "/public"));
    this.express.use("/uploads", express.static("uploads"));
    this.express.use(cors());
  }

  routes() {
    this.express.use(require("./routes/routes.js"));
  }
}

module.exports = new AppController().express;
