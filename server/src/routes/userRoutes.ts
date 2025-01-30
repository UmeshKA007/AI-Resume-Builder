import { Router } from 'express'
import { signUpController } from '../controllers/userController'

const router = Router()

router.post('/signup',signUpController)


export default router