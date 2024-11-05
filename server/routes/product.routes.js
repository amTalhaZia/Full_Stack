import { Router } from "express";
import { productCreate } from "../controllers/product.controller.js";
import { getAllProducts, getElectronicProduct, getBookProduct, getBeautyProduct, getSportsProduct, getFashionProduct,deleteProduct} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middlware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const productRouter = Router();

productRouter.route("/create").post(
    verifyJwt,
    isAdmin,
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
productRouter.route('/delete/:id').delete(deleteProduct);


// Admin  routes










export { productRouter };
