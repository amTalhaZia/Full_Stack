import mongoose, { Schema } from "mongoose";



const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
  
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum:  ["Electronics", "Fashion", "Home", "Books", "Beauty", "Sports"],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
