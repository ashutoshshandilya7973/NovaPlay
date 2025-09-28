import {Router} from 'express'
import { refereshToken, userLogin, userLogout, userRegister } from '../controller/users.controller.js'
import { verifyJwt } from '../middleware/auth.middleware.js'
const router=Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/logout').post(verifyJwt,userLogout)
router.route('/referesh').post(refereshToken)
export { router}
