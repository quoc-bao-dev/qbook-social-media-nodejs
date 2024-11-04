import { Router } from 'express';
import CommentController from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/authen.middleware';
import { addCommentValidator } from 'src/validators/comment.validator';

const commentRouter = Router();

commentRouter.get('/:postId/comments', authMiddleware, CommentController.getComments);
commentRouter.post('/:postId/comment', addCommentValidator, authMiddleware, CommentController.addComment);

export default commentRouter;