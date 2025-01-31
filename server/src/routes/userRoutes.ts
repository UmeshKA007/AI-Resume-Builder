import { Router } from 'express'
import { currentUser, loginController, signUpController } from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup',signUpController)

router.post('/login',loginController)

router.get('/me',authMiddleware,currentUser)
export default router