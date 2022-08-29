import dotenv from "dotenv";
import consign from "consign";
import express from "express";

dotenv.config({path: __dirname + "/.env.local"});
const app = express();

consign()
  .include("libs/config.js")
  .include("db.js")
  .include("auth.js")
  .include("libs/middlewares.js")
  .include("routes")
  .include("libs/boot.js")
  .into(app);
