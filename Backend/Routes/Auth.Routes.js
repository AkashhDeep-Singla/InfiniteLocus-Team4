import {Router} from 'express'
import { signinController, signupController } from '../Controllers/Auth.Controller.js';
const router=Router();
router.route("/signup").post(signupController);
router.route("/signin").post(signinController);
export default router;