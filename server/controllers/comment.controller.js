import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiErrors } from "../utils/apiErrors.js";
import { User } from "../models/user.models.js";
import {Comment}  from  "../models/comments.model.js"


const addComment = asyncHandler(async (req, res) => {
    const { content, productId } = req.body;
    const userId = req.user._id;

    // console.log("userId: " + userId);
    

    if (!userId) {
        throw new ApiErrors(401, "User not authenticated");
    }

    if (!content || !productId) {
        throw new ApiErrors(400, "Content and Product Id are required");
    }

    const comment = new Comment({
        content,
        user: userId,
        product: productId
    });

    await comment.save();

    const user = await User.findById(userId).select('username');

    res.status(201).json(new ApiResponse(201, { comment, username: user.username }, "Comment created successfully"));
});



const   deleteComment = asyncHandler(async(req, res)=> {
    const {commentId} = req.params
    const userId = req.user._id;
    
    const comment = await Comment.findById(commentId);

    if (!userId) {
        throw new ApiErrors(401, "User not authenticated");
    }

    if (comment.user.toString() !== userId.toString() ){
        throw new ApiErrors(403, "User not authorized to delete this comment");
    }

    await Comment.deleteOne({ _id: commentId });

    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
})

export { addComment, deleteComment };