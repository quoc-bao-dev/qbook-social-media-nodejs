import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import FriendService from '../services/follow.service';
import { ResponseBuilder } from 'src/utils/response';

class FollowController {
    async followUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user?.id); // ID người dùng hiện tại
            const targetId = new mongoose.Types.ObjectId(req.body.targetId); // ID người dùng mục tiêu

            await FriendService.followUser(userId, targetId);
            const respone = new ResponseBuilder({}, 'Successfully followed the user.').build();
            res.status(200).json(respone);
        } catch (error) {
            next(error);
        }
    }

    async unfollowUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.user?.id); // ID người dùng hiện tại
            const targetId = new mongoose.Types.ObjectId(req.body.targetId); // ID người dùng mục tiêu


            console.log(userId, targetId);

            await FriendService.unfollowUser(userId, targetId);

            const respone = new ResponseBuilder({}, 'Successfully unfollowed the user.').build();
            res.status(200).json(respone);
        } catch (error) {
            next(error);
        }
    }

    async getFollowers(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId); // ID người dùng mục tiêu

            const followers = await FriendService.getFollowers(userId);
            const respone = new ResponseBuilder(followers, 'Successfully fetched followers.').build();
            res.status(200).json(respone);
        } catch (error) {
            next(error);
        }
    }
}

export default new FollowController();