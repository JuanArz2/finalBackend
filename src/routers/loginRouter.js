import { Router } from "express";
import loginController from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/", loginController.login);
loginRouter.get("/:token", loginController.tokenValidation);

export default loginRouter;
