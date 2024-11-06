import { Router } from 'express';
import upload from '../middlewares/multer.middleware';
import PostController from '../controllers/post.controller';
import { authMiddleware } from 'src/middlewares/authen.middleware';
import { editPostValidator } from 'src/validators/post.validator';

const postRouter = Router();

// Route to create a post with media uploads
postRouter.post('/', editPostValidator, authMiddleware, PostController.createPost);
postRouter.get('/', authMiddleware, PostController.getPosts);
postRouter.get('/user/:userId', authMiddleware, PostController.getPostByUserId);
postRouter.get('/search/:hashtag', authMiddleware, PostController.searchPosts);
postRouter.post('/:postId/like', authMiddleware, PostController.likePost);
postRouter.post('/:postId/bookmark', authMiddleware, PostController.bookmarkPost);
postRouter.patch('/:postId/visibility', authMiddleware, PostController.changePostVisibility);
postRouter.patch('/:postId/edit', editPostValidator, authMiddleware, upload('media'), PostController.editPost);

export default postRouter;