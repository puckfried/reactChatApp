import express from 'express';
const router = express.Router();

import {addUser, loginUser, verifyCookie, addFriend} from '../controller/userController.js'
import {userValidationRules, userValidationErrorHandling} from '../midlleware/validation/userValidation.js'

import auth from '../midlleware/authentication/authentication.js'

router.route('/').post(userValidationRules(), userValidationErrorHandling, addUser)
router.route('/login').post(loginUser)
router.route('/auth').post(auth, verifyCookie)
router.route('/edit/:id/addfriend').post(addFriend)

export default router