import { Request, Response, NextFunction } from 'express';
import FriendService from '../services/friend.service';
import mongoose from 'mongoose';
import { ResponseBuilder } from 'src/utils/response';

class FriendController {
  async sendFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id); // Assuming `user` is set by authentication middleware
      const targetId = new mongoose.Types.ObjectId(req.body.targetId);

      const friendRequest = await FriendService.sendFriendRequest(userId, targetId);

      const respone = new ResponseBuilder(friendRequest, 'Successfully sent friend request.', 201).build();
      res.status(201).json(respone);
    } catch (error) {
      next(error);
    }
  }

  async acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const requesterId = new mongoose.Types.ObjectId(req.body.requesterId);


      const friend = await FriendService.acceptFriendRequest(userId, requesterId);
      const respone = new ResponseBuilder(friend, 'Friend request accepted').build();
      res.status(200).json(respone);
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
      const respone = new ResponseBuilder(result, 'Friend request rejected').build();
      res.status(200).json(respone);
    } catch (error) {
      next(error);
    }
  }

  async getFriends(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);

      const friends = await FriendService.getFriends(userId);
      const respone = new ResponseBuilder(friends, 'Successfully fetched friends').build();
      res.status(200).json(respone);
    } catch (error) {
      next(error);
    }
  }

  async removeFriend(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user?.id);
      const targetId = new mongoose.Types.ObjectId(req.body.targetId);

      await FriendService.removeFriend(userId, targetId);
      const respone = new ResponseBuilder({}, 'Successfully removed friend').build();
      res.status(200).json(respone);
    } catch (error) {
      next(error);
    }
  }
}

export default new FriendController();
