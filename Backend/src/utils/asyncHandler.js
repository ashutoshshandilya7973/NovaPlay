export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next)
    } catch (error) {
        console.log("Error while executing the code ", error);
        
        // here we use the next(error) instead of throw error because the async code return a promise and here if we use the throw error it would be a rejected promise and it will not reach to global error middleware

        return next(error)
    }
}