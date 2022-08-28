import consign from "consign";
import express from "express";

const app = express();

consign()
  .include("libs/config.js")
  .include("db.js")
  .include("libs/middlewares.js")
  .include("routes")
  .include("libs/boot.js")
  .into(app);
