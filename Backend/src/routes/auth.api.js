import {Router} from 'express'
import registerController from '../controllers/authController.js'
import { registerValidationRules} from '../validations/authValidator.js'

const authRouter = Router()

authRouter.post('/register', registerValidationRules(), registerController)

export default authRouter
