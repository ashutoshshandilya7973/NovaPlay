import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../db/databse.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isPasswordCorrect ,generateAccessAndRefreshToken,accessTokenOptions,refreshTokenOptions} from "../utils/utils.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const userRegister = asyncHandler(async (req, res, next) => {
    const {name, email, password } = req.body;
    const isUser = await prisma.User.findUnique({
        where: { email: email }
    })
    if (isUser) {
        throw new ApiError(400, "user Already exists")
    }
    const hashPassword=await bcrypt.hash(password,10)
    const user = await prisma.User.create({
        data: {
            name,
            email,
            password:hashPassword
        }
    })
    const createUser = await prisma.User.findUnique({
        where: { id: user.id }
    })
    if (!createUser) throw new ApiError(500, "Something went wrong while registering the user")

    return res.status(201).json(new ApiResponse(200, "user created successfully "))

})

const userLogin=asyncHandler(async(req,res,next)=>{
      const {email,password}=req.body;
      const isUser=await prisma.User.findUnique({
        where:{email}
      })
      if(!isUser){
        throw new ApiError(400,"user does not exist in the database")
      }
      const isPassword=isPasswordCorrect(password,isUser.password);
      if(!isPassword){
        throw new ApiError(400,"Password is not correct please use the correct password")
      }
      const {accessToken,refereshToken}= await generateAccessAndRefreshToken(isUser.id);
      return res
             .cookie('accessToken',accessToken,accessTokenOptions)
             .cookie('refereshToken',refereshToken,refreshTokenOptions)
             .status(200)
             .json(new ApiResponse(200,{accessToken,user:{name:isUser.name,email:isUser.email}},"user is logedin successfully"))
})

const userLogout=asyncHandler(async(req,res,next)=>{
      const {user}=req;
      
        await prisma.User.update({
        where:{id:user.id},
        data:{refereshToken:""}
      })

      return res.status(200)
             .clearCookie("accessToken",accessTokenOptions)
             .clearCookie("refereshToken",refreshTokenOptions)
             .json(new ApiResponse(200,{},"User logged out"))
})

const refereshToken=asyncHandler(async(req,res,next)=>{
     const token=req.cookies?.refereshToken;
     if(!token){
        return next(new ApiError(400,"unauthorised bad request"))
     }
     const isTokenValid=jwt.verify(token,process.env.REFRESHTOKEN_KEY);
     const isUser=await prisma.User.findUnique({
       where:{
         id:isTokenValid.id
       }
     })
     if(!isUser){
       return next(new ApiError(400,"refersh token ins invalid"))
     }
     const {accessToken,refereshToken}=await generateAccessAndRefreshToken(isUser.id);
    

     return res.
        cookie("accessToken",accessToken,accessTokenOptions)
        .cookie("refereshToken",refereshToken,refreshTokenOptions)
        .status(200).json(new ApiResponse(200,{isUser,accessToken},"token referesh successfully"))
})

export {
    userRegister,
    userLogin,
    userLogout,
    refereshToken
    
}