import { Router } from "express";
import friendController from "src/controllers/friend.controller";
import { authMiddleware } from "src/middlewares/authen.middleware";

const friendRouter = Router();

friendRouter.post('/send-request', authMiddleware, friendController.sendFriendRequest)
friendRouter.post('/accept-request', authMiddleware, friendController.acceptFriendRequest)
friendRouter.post('/reject-request', authMiddleware, friendController.rejectFriendRequest)
friendRouter.get('/list', authMiddleware, friendController.getFriends)
friendRouter.delete('/remove', authMiddleware, friendController.removeFriend)

export default friendRouter