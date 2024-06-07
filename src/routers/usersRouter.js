import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/", usersController.createUser);
usersRouter.get("/:id", usersController.readUser);
usersRouter.get("/", usersController.readAllUsers);
usersRouter.put("/:id", usersController.updateUser);
usersRouter.delete("/:id", usersController.deleteUser);

export default usersRouter;
