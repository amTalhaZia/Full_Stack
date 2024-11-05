import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadCloudinary } from "../utils/Cloudanry.js";


const productCreate = asyncHandler(async (req, res) => {
  const { name, description, title, brand, category, price } = req.body;

  // console.log("files", req.files);

  const localPath = req.files?.image && req.files.image.length > 0 ? req.files.image[0].path : null;

  if (!localPath) {
      throw new ApiErrors(400, "Image is required for product creation.");
  }

  const imageUrl = await uploadCloudinary(localPath);

  if (!imageUrl) {
      throw new ApiErrors(500, "Failed to upload image to Cloudinary.");
  }

  const product = new Product({
      name,
      description,
      title,
      brand,
      category,
      price,
      image: imageUrl.url
  });

  // console.log("Product to be saved:", product);

  await product.save();

  res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();

  if (!product) {
    throw new ApiErrors(404, "Product not found");
  }
  res.json(new ApiResponse(200, product, "Products fetched successfully"));
});

const getElectronicProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: "Electronics" });

  if (!product) {
    throw new ApiErrors(404, "Electronic product not found");
  }
  res.json(
    new ApiResponse(200, product, "Electronic product fetched successfully")
  );
});

const getFashionProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: "Fashion" });
  if (!product) {
    throw new ApiErrors(404, "Fashion product not found");
  }
  res.json(
    new ApiResponse(200, product, "Fashion product fetched successfully")
  );
});

const getBookProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: "Books" });
  if (!product) {
    throw new ApiErrors(404, "Book product not found");
  }
  res.json(new ApiResponse(200, product, "Book product fetched successfully"));
});

const getBeautyProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: "Beauty" });
  if (!product) {
    throw new ApiErrors(404, "Beauty product not found");
  }
  res.json(
    new ApiResponse(200, product, "Beauty product fetched successfully")
  );
});

const getSportsProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: "Sports" });
  if (!product) {
    throw new ApiErrors(404, "Sports product not found");
  }
  res.json(
    new ApiResponse(200, product, "Sports product fetched successfully")
  );
});

const deleteProduct =  asyncHandler(async(req, res)=> {
  const  product = await Product.findById(req.params.id)
  if(!product){
    throw new ApiErrors(404, 'Product not found')
  }
  await product.deleteOne({_id: product})
  res.json(new ApiResponse(200, null, 'Product deleted successfully'))
})

export {
  productCreate,
  getAllProducts,
  getElectronicProduct,
  getBookProduct,
  getBeautyProduct,
  getSportsProduct,
  getFashionProduct,
  deleteProduct
};
