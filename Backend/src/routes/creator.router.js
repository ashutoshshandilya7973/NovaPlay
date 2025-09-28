import { Router } from "express";
import { creatorLogin, creatorSignUp, refereshToken } from "../controller/creator.controller.js";


const router=Router()

router.route("/register").post(creatorSignUp);
router.route("/login").post(creatorLogin)
router.route("/referesh",refereshToken)

export {router}