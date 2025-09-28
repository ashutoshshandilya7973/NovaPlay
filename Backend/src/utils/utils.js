import { prisma } from "../db/databse.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiError } from "./ApiError.js";


const isPasswordCorrect = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword)
}

const generateAccessToken = async (user) => {

    const accessToken =await jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESSTOKEN_KEY, {
        expiresIn: '15m'
    })
    return accessToken
}
const generateRefershToken = async (user) => {

    const refershToken = await jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.REFRESHTOKEN_KEY, {
        expiresIn: '1d'
    })
    return refershToken
}


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await prisma.User.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new ApiError(400, "user is found in the database of given userid")
        }
        const accessToken =await generateAccessToken(user)
        const refereshToken =await generateRefershToken(user)
        user.refershToken = refereshToken;
        await prisma.User.update({
            where: { id: user.id },
            data: { refereshToken }
        })
        return { accessToken, refereshToken }
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}


const accessTokenOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 86400000
}

const refreshTokenOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 86400000
}

export { isPasswordCorrect, generateAccessAndRefreshToken, accessTokenOptions, refreshTokenOptions }
