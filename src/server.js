import path from "path"; // Modulo de NOTE para enrutar los archivos, => L-17
import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routers/usersRouter.js";
import loginRouter from "./routers/loginRouter.js";
import productsRouter from "./routers/productsRouter.js"; // Todos fuera de corchetes porque está exportado por default
import shopRouter from "./routers/shopRouter.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use("/users", usersRouter);
server.use("/login", loginRouter);
server.use("/products", productsRouter);
server.use("/shop", shopRouter);

server.use("/images", express.static(path.resolve("images")));

server.get("/", (sol, res) => {
  res.status(404).send("Not found, try /login on the URL");
});

export default server;
