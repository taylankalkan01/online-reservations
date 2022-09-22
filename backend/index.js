import express from "express";
import colors from "colors";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import mongoConnectionDatabase from "./db/mongoConnectionDatabase/mongoConnectionDatabase.js";
import { initRoutes } from "./routes/index.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
mongoConnectionDatabase();
initRoutes(app);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running PORT : ${PORT}`.yellow.yellow);
});
