import { Router } from "express";
import { productCreate } from "../controllers/product.controller.js";
import { getAllProducts, getElectronicProduct, getBookProduct, getBeautyProduct, getSportsProduct, getFashionProduct} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middlware.js";


const productRouter = Router();

productRouter.route("/create").post(
    upload.fields([
        {
            name: 'image',
            maxCount: 1
        }
        
    ]),
    productCreate 
);
productRouter.route("/allproducts").get(getAllProducts);
productRouter.route("/electronic").get(getElectronicProduct);
productRouter.route("/books").get(getBookProduct);
productRouter.route("/beauty").get(getBeautyProduct);
productRouter.route("/sports").get(getSportsProduct);
productRouter.route("/fashion").get(getFashionProduct);









export { productRouter };
