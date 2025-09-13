import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { prisma } from '../db/databse.js';


const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_KEY);
        const getUser = await prisma.User.findUnique({
            where: { id: decodedToken?.id }
        })
        if (!getUser) {

            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = getUser;
        next()


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }



}

export { verifyJwt }