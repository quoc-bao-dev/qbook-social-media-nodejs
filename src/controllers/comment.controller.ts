import { Request, Response, NextFunction } from 'express';
import CommentService from '../services/comment.service';

class CommentController {
    async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;
            const userId = req.user?.id;
            const { content } = req.body;

            if (!userId) {
                return next(new Error('User ID is required'));
            }

            // Call CommentService to add the comment
            const comment = await CommentService.addComment(postId, userId, content);

            res.status(201).json({ success: true, data: comment });
        } catch (error) {
            next(error);
        }
    }

    async getComments(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;

            const comments = await CommentService.getComments(postId);

            res.status(200).json({ success: true, data: comments });
        } catch (error) {
            next(error); // Pass the error to the error handler
        }
    }
}

export default new CommentController();