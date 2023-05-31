import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import sequelize from "./db.js";

import router from "./router/index.js";

import ErrorHandler from "./middleware/ErrorHandlingMiddleware.js";

import * as models from "./models/models.js";

import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(fileUpload({}));
app.use(cors());
app.use("/api", router);

// Обработка ошибок
app.use(ErrorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
