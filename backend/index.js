import express from "express";
import colors from "colors";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import mongoConnectionDatabase from "./db/mongoConnectionDatabase/mongoConnectionDatabase.js";
import { initRoutes } from "./routes/index.js";
import refreshTokenRoutes from "./routes/refreshToken.js"
import testRouter from "./routes/test.js"

const app = express();
dotenv.config();
app.use(express.json());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());


mongoConnectionDatabase();
initRoutes(app);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/test", testRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running PORT : ${PORT}`.yellow.yellow);
});
