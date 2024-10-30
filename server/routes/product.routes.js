import { Router } from "express";
import { productCreate } from "../controllers/product.controller.js";
import { getAllProducts, getElectronicProduct } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/create").post(productCreate);
productRouter.route("/allproducts").get(getAllProducts);
productRouter.route("/electronic").get(getElectronicProduct);



export { productRouter };
