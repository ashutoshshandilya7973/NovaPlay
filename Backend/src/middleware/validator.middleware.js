import { ApiError } from "../utils/ApiError.js";

const validator=(schema)=>async(req,res,next)=>{
    try {
        await schema.parse(req.body);
        next()
    } catch (error) {
        return next(new ApiError(400,error.message))
    }
}
export {validator}