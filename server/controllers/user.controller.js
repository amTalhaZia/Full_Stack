import { ApiErrors } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/Cloudanry.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrors(500, "Something went wrong while generating token");
  }
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiErrors(400, "All fields are required");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new ApiErrors(409, "UserName already exists");
  }

  const localPath =
    req.files?.avatar && req.files.avatar.length > 0
      ? req.files.avatar[0].path
      : null;
  console.log(localPath);

  const avatar = await uploadCloudinary(localPath);

  // console.log(avatar)

  if (!avatar) {
    throw new ApiErrors(500, "Error uploading image to cloudinary");
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar: avatar.url,
    role: "user",
  });

  const isUserCreated = await User.findById(user._id);

  if (!isUserCreated) {
    throw new ApiErrors(404, "User not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, isUserCreated, "User Created Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiErrors(400, "Username and password are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiErrors(400, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordMatch(password);

  if (!isPasswordCorrect) {
    throw new ApiErrors(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});



const amdinPannelAccess = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new ApiErrors(409, "user already exists");
  }

  const newAdmin = await User.create({
    username,
    email,
    password,
    role: "admin",
  });

  if (!newAdmin) {
    throw new ApiErrors(500, "Error creating user");
  }

  await newAdmin.save();


  return res
    .status(201)
    .json(new ApiResponse(201, newAdmin, "Admin user created successfully"));
});

export { register, login, logout,  amdinPannelAccess};
