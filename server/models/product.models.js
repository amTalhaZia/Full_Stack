import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [{ 
      type: String,
      required: true, 
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
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
      required: true,
    },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);

export { Product };
