import { Router } from "express";
import shopController from "../controllers/shopController.js";

const shopRouter = Router();

shopRouter.post("/", shopController.createShop);
shopRouter.get("/:id", shopController.readShop);
shopRouter.get("/", shopController.readAllShop);
shopRouter.put("/:id", shopController.updateShop);
shopRouter.delete("/:id", shopController.deleteShop);

export default shopRouter;
