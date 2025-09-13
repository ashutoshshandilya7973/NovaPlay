import dotenv from "dotenv"
import { app } from "./app.js"



dotenv.config({
    path:"./.env"
})


  app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listen on the port ${process.env.PORT}`)
  })

