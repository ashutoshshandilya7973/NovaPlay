import {z} from 'zod'

const userRegisterSchema=z.object({
    name:z.string({required_error:"name is required"})
    .trim()
    .min(4,{message:"Name must be above 4 letter"})
    .max(20,{message:"Name must be below 20 letter"}),

    email:z.email({message:"email is not in the format"})
    .trim(),
    
    password:z.string({required_error:"password is required"})
    .trim()
    .min(5,{message:"password should be above length 5"})
    .max(12,{message:"password should be below length 12"})

})

export {userRegisterSchema}