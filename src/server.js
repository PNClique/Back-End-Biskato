// const bodyParser = require("body-parser");
// const cors = require("cors");
// const express = require("express");
const app = require("./app");

// parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + "/public"));
// app.use("/uploads", express.static("uploads"));
// app.use(cors());

app.listen(process.env.PORT || 3000);
