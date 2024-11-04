import User from '../models/user.schema'; // Giả sử đây là model người dùng
import mongoose from 'mongoose';
import FriendService from '../services/friend.service';
import FollowService from '../services/follow.service';

class UserService {
    async getUserInfo(userId: string) {
        // Tìm kiếm người dùng theo userId và loại trừ password và refresh tokens
        const user = await User.findById(userId).select('-hashedPassword');

        if (!user) {
            return null;
        }

        const userIdObj = new mongoose.Types.ObjectId(userId);
        const followers = await FollowService.getFollowerIds(userIdObj);
        const following = await FollowService.getFollowingIds(userIdObj);
        const friends = await FriendService.getFriendIds(userIdObj);

        user.followers = followers;
        user.following = following;
        user.friends = friends;

        await user.save()

        const result = await User.findById(userId).select('-hashedPassword').populate('followers', 'username email').populate('following', 'username email').populate('friends', 'username email');

        return result
    }

    async updateUser(userId: string, data: any) {
        const result = await User.findByIdAndUpdate(userId, data, { new: true });
        return result
    }
}

export default new UserService();