// src/services/PostService.ts
import mongoose from 'mongoose';
import { CreatePostPayload } from 'src/controllers/post.cotroller';
import { ForbiddenError, NotFoundError } from 'src/utils/errors';
import PostModel, { IPostDocument } from '../models/post.schema';

class PostService {

    async getPostsByUser(userId: string): Promise<IPostDocument[]> {
        const posts = await PostModel.find({ userId }).sort({ createdAt: -1 }).exec();
        return posts;
    }

    async searchPostsByHashtag(hashtag: string): Promise<IPostDocument[]> {
        const posts = await PostModel.find({ hashtags: { $in: [hashtag] } }).sort({ createdAt: -1 }).exec();
        return posts;
    }
    async createPost(payload: CreatePostPayload): Promise<IPostDocument> {
        const { content, media, visibility, hashtags, userId } = payload;

        if (!userId || !content) {
            throw new Error('User ID and content are required.');
        }

        const newPost = new PostModel({
            userId,
            content,
            media,
            visibility,
            hashtags,
        });

        await newPost.save();
        return newPost;
    }

    async likePost(postId: string, userId: string): Promise<IPostDocument | null> {
        const post = await PostModel.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }


        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Kiểm tra xem user đã like chưa
        const isLiked = post.likes.some(id => id.toString() === userObjectId.toString());

        if (!isLiked) {
            // Nếu chưa like, thêm vào mảng likes
            post.likes.push(userObjectId);
        } else {
            // Nếu đã like, xóa khỏi mảng likes
            post.likes = post.likes.filter(id => !(id.toString() === userObjectId.toString()));
        }

        await post.save();

        return post;
    }

    async bookmarkPost(postId: string, userId: string): Promise<IPostDocument | null> {
        const post = await PostModel.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }


        const userObjectId = new mongoose.Types.ObjectId(userId);

        const isBookmarked = post.saves.some(id => id.toString() === userObjectId.toString());

        if (!isBookmarked) {
            // Nếu chưa bookmark, thêm vào mảng saves
            post.saves.push(userObjectId);
        } else {
            // Nếu đã bookmark, xóa khỏi mảng saves
            post.saves = post.saves.filter(id => !(id.toString() === userObjectId.toString()));
        }

        await post.save();

        return post;
    }

    async changePostVisibility(postId: string, userId: string, newVisibility: string): Promise<IPostDocument | null> {
        const post = await PostModel.findById(postId);
        console.log(post!.userId.toString());
        console.log(userId);



        if (!post) {
            throw new Error('Post not found');
        }

        // Check if the user is the owner of the post
        if (post.userId.toString() !== userId) {
            throw new Error('User is not authorized to change visibility of this post');
        }



        // Validate newVisibility value (optional)
        const validVisibilities = ['public', 'private', 'restricted'];
        if (!validVisibilities.includes(newVisibility)) {
            throw new Error('Invalid visibility status');
        }

        // Update the post's visibility
        post.visibility = newVisibility;
        await post.save();

        return post;
    }

    async updatePost(
        postId: string,
        userId: string,
        updatedData: Partial<IPostDocument>
    ): Promise<IPostDocument> {
        const post = await PostModel.findById(postId);

        if (!post) {
            throw new NotFoundError('Post not found');
        }

        // Ensure only the post owner can edit it
        if (post.userId.toString() !== userId) {
            throw new ForbiddenError('You are not authorized to edit this post');
        }

        // Update the fields
        Object.assign(post, updatedData);
        await post.save();
        return post;
    }
}

export default new PostService();
