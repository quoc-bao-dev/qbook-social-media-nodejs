import { Router } from "express";
import followController from "src/controllers/follow.controller";
import { authMiddleware } from "src/middlewares/authen.middleware";

const followRouter = Router();

followRouter.get('/followers/:userId', authMiddleware, followController.getFollowers);
followRouter.post('/follow', authMiddleware, followController.followUser)
followRouter.delete('/unfollow', authMiddleware, followController.unfollowUser);


export default followRouter