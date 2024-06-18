import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.post("/", productsController.createProduct);
productsRouter.get("/:id", productsController.readProduct);
productsRouter.get("/", productsController.readAllProducts);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
