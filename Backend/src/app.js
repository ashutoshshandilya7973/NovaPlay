import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
    cors({
        origin: "http://localhost:5175", 
        credentials: true, 
    })
);


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static("public"));

import { router as userRouter } from './routes/user.router.js';
import { router as creatorRoute } from './routes/creator.router.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/creator',creatorRoute)
app.get('/',(req,res)=>{
    res.send({message:"server is running"})
})




app.use((req, res) => {
  res.status(404).send("Not found");
});

export { app };
