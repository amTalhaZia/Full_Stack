import { Product } from '../models/product.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiErrors } from '../utils/apiErrors.js'; 
import { ApiResponse } from '../utils/apiResponse.js';

const productCreate = asyncHandler(async (req, res) => {
    const product = new Product(req.body);

    if (!product) {
        throw new ApiErrors(400, 'Product creation failed');
    }

    await product.save();
    res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});


const getAllProducts =  asyncHandler(async(req, res)=> {
       const product =   await   Product.find();

       if (!product) {
          throw new ApiErrors(404, "Product not found");
       }
       res.json(new ApiResponse(200, product, "Products fetched successfully"));
})


const getElectronicProduct =   asyncHandler(async(req, res) => {
    const product  =  await  Product.find({category: "Electronics"})

       if (!product) {
          throw new ApiErrors(404, "Electronic product not found");
       }
       res.json(new ApiResponse(200, product, "Electronic product fetched successfully"));
})

export { 
    productCreate,
    getAllProducts,
    getElectronicProduct
};
