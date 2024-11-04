import mongoose from 'mongoose';
import Relationship from '../models/relationship.schema'; // Giả sử đây là model quan hệ

class FriendService {
    // Follow người dùng
    async followUser(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
        // Kiểm tra nếu quan hệ follow đã tồn tại
        const existingFollow = await Relationship.findOne({
            userId,
            targetId,
            type: { $in: ['follow', 'friend'] },
            status: { $ne: 'rejected' }
        });


        if (existingFollow) {
            throw new Error('You are already following this user.');
        }

        if (!existingFollow) {
            // Tạo mới quan hệ follow nếu chưa tồn tại
            await Relationship.create({
                userId,
                targetId,
                type: 'follow',
                status: 'active' // Trạng thái active cho quan hệ follow
            });
        }
    }

    async unfollowUser(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
        // Xóa quan hệ follow
        await Relationship.deleteOne({
            userId,
            targetId,
            type: 'follow'
        });
    }

    async getFollowers(userId: mongoose.Types.ObjectId) {
        const followers = await Relationship.find({
            targetId: userId,
            type: 'follow'
        }, { _id: 0, userId: 1 }).populate('userId', 'username email').exec();

        return followers.map(follower => follower.userId);

    }


    getFollowerIds = async (userId: mongoose.Types.ObjectId) => {
        const followers = await Relationship.find({
            targetId: userId,
            type: 'follow'
        })
        return followers.map(follower => follower.userId)
    }

    getFollowingIds = async (userId: mongoose.Types.ObjectId) => {
        const following = await Relationship.find({
            userId: userId,
            type: 'follow'
        })
        return following.map(following => following.targetId)
    }
}

export default new FriendService();