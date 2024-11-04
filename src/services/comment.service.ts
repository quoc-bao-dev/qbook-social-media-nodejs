import { NotFoundError } from 'src/utils/errors';
import CommentModel, { ICommentDocument } from '../models/comment.schema';
import PostModel from '../models/post.schema';

class CommentService {
    async addComment(
        postId: string,
        userId: string,
        content: string
    ): Promise<ICommentDocument> {
        // Check if the post exists
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new NotFoundError('Post not found');
        }

        // Create the new comment
        const comment = new CommentModel({
            postId,
            userId,
            content,
        });

        await comment.save();
        return comment;
    }

    async getComments(postId: string): Promise<ICommentDocument[]> {
        const comments = await CommentModel.find({ postId })
            .populate('userId', 'username profilePicture') // Populate user data if needed
            .sort({ createdAt: -1 }); // Sort comments by creation date (most recent first)

        if (!comments) {
            throw new NotFoundError('Comments not found');
        }

        return comments;
    }
}

export default new CommentService();