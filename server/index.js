import express from "express";
import sequelize from "./db.js";

import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
} 

start()
