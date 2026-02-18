const User = require('../models/User.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;

    if(!name|| !email || !password){
        throw new ApiError(400,"Fields cannot be empty")
    }

    const userExists = await User.findOne({email})

    if(userExists){
        throw new ApiError(400,"User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    return res.status(201).json(new ApiResponse(201,"User registered",{
        _id: user._id,
        name: user.name,
        email: user.email
    }))
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new ApiError(400,"Fields cannot be empty")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"User does not exists")
    }
    
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken(user._id)

    res.status(200).json(new ApiResponse(
        201,"Login success",{
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        }
    ))
})

module.exports = { registerUser, loginUser}