import { Router } from "express";
import { addComment, deleteComment } from "../controllers/comment.controller.js";
import  {verifyJwt}   from   "../middleware/auth.middleware.js"

const commentRouter = Router();

commentRouter.route('/comments').post(verifyJwt, addComment)
commentRouter.route('/comments/:commentId').post(verifyJwt, deleteComment)



export{commentRouter}


