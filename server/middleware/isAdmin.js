import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/apiErrors.js";

const isAdmin = asyncHandler((req, res, next) => {
    console.log("isAdmin", req.user)
   if (req.user && req.user.role === 'admin') {
       next();
   } else {
       res.status(403).json(new ApiErrors(403, "Access denied. Admins only."));
   }
});

export { isAdmin };
