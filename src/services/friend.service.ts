import mongoose from 'mongoose';
import Relationship from '../models/relationship.schema';

class FriendService {
    // Send a friend request
    async sendFriendRequest(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
        // Check if a request already exists
        const existingRequest = await Relationship.findOne({
            $or: [
                { userId, targetId },
                { userId: targetId, targetId: userId },
            ],
            type: 'friend',
            status: { $ne: 'rejected' }
        });

        if (existingRequest) {
            throw new Error('Friend request already exists or you are already friends.');
        }

        // Remove rejected friend requests
        await Relationship.deleteMany({
            $or: [
                { userId, targetId },
                { userId: targetId, targetId: userId },
            ],
            type: 'friend',
            status: 'rejected'
        });

        // Create a new friend request
        const friendRequest = new Relationship({
            userId,
            targetId,
            type: 'friend',
            status: 'pending',
        });

        await friendRequest.save();
        return friendRequest;
    }

    // Accept a friend request
    async acceptFriendRequest(userId: mongoose.Types.ObjectId, requesterId: mongoose.Types.ObjectId) {
        const request = await Relationship.findOneAndUpdate(
            { userId: requesterId, targetId: userId, type: 'friend', status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        if (!request) {
            throw new Error('Friend request not found or already handled.');
        }

        // Remove rejected friend requests
        await Relationship.deleteMany({ userId: requesterId, targetId: userId, type: { $in: ['friend', 'follow'] }, status: { $in: ['rejected', 'blocked', 'active'] } });


        return request;
    }

    // Reject a friend request
    async rejectFriendRequest(userId: mongoose.Types.ObjectId, requesterId: mongoose.Types.ObjectId) {
        const request = await Relationship.findOneAndUpdate(
            { userId: requesterId, targetId: userId, type: 'friend', status: 'pending' },
            { status: 'rejected' },
            { new: true }
        );

        return request;
    }

    // Get a list of friends
    async getFriends(userId: mongoose.Types.ObjectId) {
        const friends = await Relationship.find({
            $or: [{ userId }, { targetId: userId }],
            type: 'friend',
            status: 'accepted',
        });

        return Promise.all(
            friends.map(async (rel) => {
                const id = rel.userId.toString() === userId.toString() ? rel.targetId : rel.userId;
                const user = await mongoose.model('User').findById(id, 'username email');
                return user ? { id: user._id, username: user.username, email: user.email } : null;
            })
        );
    }

    async getFriendIds(userId: mongoose.Types.ObjectId) {
        const friends = await Relationship.find({
            $or: [{ userId }, { targetId: userId }],
            type: 'friend',
            status: 'accepted',
        });

        return friends.map(friend => friend.userId.toString() === userId.toString() ? friend.targetId : friend.userId);
    }

    async removeFriend(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
        const relationship = await Relationship.deleteOne({
            $or: [
                { userId, targetId },
                { userId: targetId, targetId: userId }
            ],
            type: 'friend',
            status: 'accepted'
        });

        if (relationship.deletedCount === 0) {
            throw new Error('Friendship not found or already removed.');
        }
    }
}

export default new FriendService();