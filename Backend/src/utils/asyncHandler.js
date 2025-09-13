export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next)
    } catch (error) {
        console.log("Error while executing the code ", error);
        return next(error)
    }
}