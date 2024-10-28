import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { logout } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlware.js";
const  router =  Router()

router.route("/register").post(
    upload.fields(
        [
            { name: "avatar", maxCount: 1 },
        ]
    )
    ,register);
router.route("/login").post(login)
router.route("/logout").post(verifyJwt, logout)


export{router}