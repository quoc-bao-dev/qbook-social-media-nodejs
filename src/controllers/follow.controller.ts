import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import FriendService from '../services/follow.service';

class FollowController {
    async followUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user?.id); // ID người dùng hiện tại
            const targetId = new mongoose.Types.ObjectId(req.body.targetId); // ID người dùng mục tiêu

            await FriendService.followUser(userId, targetId);
            res.status(200).json({ message: 'Successfully followed the user.' });
        } catch (error) {
            next(error);
        }
    }

    async unfollowUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user?.id); // ID người dùng hiện tại
            const targetId = new mongoose.Types.ObjectId(req.body.targetId); // ID người dùng mục tiêu

            await FriendService.unfollowUser(userId, targetId);
            res.status(200).json({ message: 'Successfully unfollowed the user.' });
        } catch (error) {
            next(error);
        }
    }

    async getFollowers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId); // ID người dùng mục tiêu

            const followers = await FriendService.getFollowers(userId);
            res.status(200).json({ followers });
        } catch (error) {
            next(error);
        }
    }
}

export default new FollowController();