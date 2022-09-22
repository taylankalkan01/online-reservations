import express from "express";
import loginRoutes from "./login.routes.js";
import registerRoutes from "./register.routes.js";

const app = express();

export function initRoutes(app) {
  app.use("/api/auth", loginRoutes);
  app.use("/api/auth", registerRoutes);
  app.use("/check", (req, res) => res.json({message: 'Ok!'}));
}
