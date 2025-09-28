import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../db/databse.js";
import { isPasswordCorrect,generateAccessAndRefreshToken,accessTokenOptions,refreshTokenOptions } from "../utils/utils.js";
import bcrypt from "bcrypt"
const creatorLogin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const userExist=await prisma.Course_creator.findUnique({
        where:{
            email
        }
    })
    if(!userExist){
        throw new ApiError(400,"user not exist")
    }

    const passwordMatch=await isPasswordCorrect(password,userExist.password);

    if(!passwordMatch){
        throw new ApiError(400,"password is not valid")
    }

    const {accessToken, refereshToken}=await generateAccessAndRefreshToken(userExist.id)

    return res
           .cookie("accessToken",accessToken,accessTokenOptions)
           .cookie("refereshToken",refereshToken,refreshTokenOptions)
           .status(200)
           .json(new ApiResponse(200,"User is logedin successfully"))

    


})


const creatorSignUp=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const userExist=await prisma.Course_creator.findUnique({
        where:{
            email
        }
    })

    if(userExist){
        throw new ApiError(400,"user Already Exists")
    }
    const hashPassword=await bcrypt.hash(password,10);

    const user=await prisma.Course_creator.create({
        data:{
            name,
            email,
            password:hashPassword
        }
    })

    const userCreate=await prisma.Course_creator.findUnique({
        where:{
            id:user.id
        }
    })
    if(!userCreate){
        throw new ApiError(500,"internal server error user not created")
    }

    return res.status(200).json(new ApiResponse(200,userCreate,"user created successfully"))
})
const refereshToken=asyncHandler(async(req,res,next)=>{
     const token=req.cookies?.refereshToken;
     if(!token){
        return next(new ApiError(400,"unauthorised bad request"))
     }
     const isTokenValid=jwt.verify(token,process.env.REFRESHTOKEN_KEY);

     const isUser=await prisma.Course_creator.findUnique({
       where:{
         id:isTokenValid.id
       }
     })
     if(!isUser){
       return next(new ApiError(400,"refersh token ins invalid"))
     }
     const {accessToken,refereshToken}=generateAccessAndRefreshToken(isUser.id);
     return res.
        cookie("accessToken",accessToken,accessTokenOptions)
        .cookie("refereshToken",refereshToken,refreshTokenOptions)
        .status(200).json(new ApiResponse(200,accessToken,"token referesh successfully"))
})
export {creatorSignUp,creatorLogin,refereshToken}