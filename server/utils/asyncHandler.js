const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("Error caught in asyncHandler:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            statusCode: error.statusCode || 500 
        });
    }
};


export { asyncHandler };
