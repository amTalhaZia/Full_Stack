import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [{ // Ensure this is an array
      type: String,
      required: true, // Required field
    }],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Fashion", "Home", "Books", "Beauty", "Sports"],
      required: true,
    },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);

export { Product };
