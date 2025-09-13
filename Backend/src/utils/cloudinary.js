import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

async function uploadResult(filePath){
      try {
         if(!filePath) return null
         const result=await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
         })
         fs.unlinkSync(filePath)
         return result
        
      } catch (error) {
           console.log("error while uploading the file on the cloudinary",error);
           fs.unlinkSync(filePath)
           return null
      }
}

export {uploadResult}