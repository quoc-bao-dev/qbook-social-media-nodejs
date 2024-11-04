import express from 'express';
import UserController from '../controllers/user.controller';
import { authMiddleware } from 'src/middlewares/authen.middleware';
import { updateUserValidator } from 'src/validators/user.validator';

const userRouter = express.Router();

userRouter.get('/:userId', authMiddleware, UserController.getUserInfo);
userRouter.patch('/:userId', updateUserValidator, authMiddleware, UserController.updateUser);

export default userRouter;