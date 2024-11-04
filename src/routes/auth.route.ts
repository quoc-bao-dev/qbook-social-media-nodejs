import express from 'express';
import AuthController from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { authMiddleware } from 'src/middlewares/authen.middleware';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, AuthController.login);
authRouter.post('/register', registerValidator, AuthController.register);
authRouter.post('/logout', authMiddleware, AuthController.logout);
authRouter.post('/refresh-token', AuthController.refreshToken);

export default authRouter;