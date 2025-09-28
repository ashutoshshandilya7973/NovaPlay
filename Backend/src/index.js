import dotenv from "dotenv"
import { app } from "./app.js"
import { globalErrorHandler } from "./middleware/globalHandler.middleware.js"



dotenv.config({
  path: "./.env"
})

//add the global error handler at the last

app.use(globalErrorHandler)


app.listen(process.env.PORT || 3000, () => {
  console.log(`server is listen on the port ${process.env.PORT}`)
})

