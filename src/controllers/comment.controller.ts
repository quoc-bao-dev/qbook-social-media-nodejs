import { Request, Response, NextFunction } from 'express';
import CommentService from '../services/comment.service';
import { ResponseBuilder } from 'src/utils/response';

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

            const response = new ResponseBuilder(comment, 'Comment added successfully', 201).build()
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getComments(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;

            const comments = await CommentService.getComments(postId);

            const response = new ResponseBuilder(comments, 'Comments fetched successfully').build()

            res.status(200).json(response);
        } catch (error) {
            next(error); // Pass the error to the error handler
        }
    }
}

export default new CommentController();