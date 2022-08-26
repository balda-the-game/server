import consign from "consign";
import express from "express";

const app = express();

consign()
  .include("models")
  .include("libs/middlewares.js")
  .include("routes")
  .include("libs/boot.js")
  .into(app);
