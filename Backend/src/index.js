import dotenv from "dotenv"
import { app } from "./app"
import { connectDB } from "./db/databse"



dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listen on the port ${process.env.PORT}`)
  })

})
.catch((err)=>{
    console.log("Error while conecting to the database: ",err)
})
