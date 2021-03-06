import express from 'express';
const router = express.Router();

import {addUser, loginUser, verifyCookie, addFriend, findRelations, updateUserById, findUser, logout} from '../controller/userController.js'
import {userValidationRules, userValidationErrorHandling} from '../midlleware/validation/userValidation.js'

import auth from '../midlleware/authentication/authentication.js'
import {isEmail, prepareInput} from '../midlleware/searchInput.js';

router.route('/signin').post(userValidationRules(), userValidationErrorHandling, addUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/auth').post(auth, verifyCookie)
router.route('/:id/register').post(auth, updateUserById)
router.route('/:id/findfriend').post(auth, isEmail(), prepareInput, findUser)
router.route('/:id/addfriend').post(auth, addFriend)
router.route('/:id/findrelations').post(auth, findRelations)
export default router