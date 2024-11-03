import mongoose from "mongoose";


const commentSchema =  new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    },{timestamps:true});


    const Comment = mongoose.model("Comment", commentSchema);
    export  {Comment};