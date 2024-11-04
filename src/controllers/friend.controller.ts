import { Request, Response, NextFunction } from 'express';
import FriendService from '../services/friend.service';
import mongoose from 'mongoose';

class FriendController {
  async sendFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id); // Assuming `user` is set by authentication middleware
      const targetId = new mongoose.Types.ObjectId(req.body.targetId);

      const friendRequest = await FriendService.sendFriendRequest(userId, targetId);
      res.status(201).json({ message: 'Friend request sent', friendRequest });
    } catch (error) {
      next(error);
    }
  }

  async acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const requesterId = new mongoose.Types.ObjectId(req.body.requesterId);


      const friend = await FriendService.acceptFriendRequest(userId, requesterId);
      res.status(200).json({ message: 'Friend request accepted', friend });
    } catch (error) {
      next(error);
    }
  }

  async rejectFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.user?.id);
      console.log(req.body.requesterId);


      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const requesterId = new mongoose.Types.ObjectId(req.body.requesterId);

      const result = await FriendService.rejectFriendRequest(userId, requesterId);
      res.status(200).json({ message: 'Friend request rejected', result });
    } catch (error) {
      next(error);
    }
  }

  async getFriends(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);

      const friends = await FriendService.getFriends(userId);
      res.status(200).json({ friends });
    } catch (error) {
      next(error);
    }
  }

  async removeFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const targetId = new mongoose.Types.ObjectId(req.body.targetId);

      await FriendService.removeFriend(userId, targetId);
      res.status(200).json({ message: 'Friendship removed successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new FriendController();
