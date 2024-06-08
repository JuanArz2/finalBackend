import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routers/usersRouter.js";
import loginRouter from "./routers/loginRouter.js";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use("/users", usersRouter);
server.use("/login", loginRouter);

server.get("/", (sol, res) => {
  res.status(404).send("Not found, this is the root path. Try /login");
});

export default server;
