const dotenv = require("dotenv");
const consign = require("consign");
const express = require("express");

const app = express();

dotenv.config({ path: __dirname + "/.env.local" });

consign()
  .include("libs/config.js")
  .include("db.js")
  .include("auth.js")
  .include("libs/middlewares.js")
  .include("controllers")
  .include("routes")
  .include("libs/boot.js")
  .into(app);


module.exports = app;