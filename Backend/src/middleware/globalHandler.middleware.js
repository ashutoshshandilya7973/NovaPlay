
const devError=(res,err)=>{
    return res.status(err.statuscode).json({
        status:err.status,
        message:err.message,
        stack:err.stack,
        error:err
    })
}

const prodErrors = (res, err) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message });
    } else {
        return res.status(err.statusCode).json({
            status: 'error',
            message: 'Something went wrong! Please try again later',
        });
    }
};



const globalErrorHandler=(err,req,res,next)=>{
    err.statuscode=err.statuscode||500;
    err.status=err.status||"error"

    if(process.env.NODE_ENV==="development"){
        devError(res,err)
    }else if(process.env.NODE_ENV==="production"){
        prodErrors(res,err)
    }else{
        res.status(500).json({message:"Node server error"})
    }
}

export {globalErrorHandler}