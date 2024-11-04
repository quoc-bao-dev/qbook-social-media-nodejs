import { NextFunction, Request, Response } from 'express';
import PostService from '../services/post.service';

class PostController {

    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id as string;// Assume userId is passed as a URL parameter
            const posts = await PostService.getPostsByUser(userId);
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                posts,
            });
        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }
    async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const newPost = await PostService.createPost(req);
            res.status(201).json({
                status: 'success',
                statusCode: 201,
                post: newPost,
            });
        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }

    async editPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;
            const userId = req.user?.id;
            const { content, media, visibility, hashtags } = req.body;

            if (!userId) {
                return next(new Error('User ID is required'));
            }

            // Call the PostService to update the post
            const updatedPost = await PostService.updatePost(postId, userId, {
                content,
                media,
                visibility,
                hashtags
            });

            res.status(200).json({ success: true, data: updatedPost });
        } catch (error) {
            next(error);
        }
    }

    async searchPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const { hashtag } = req.params; // Assume hashtag is passed as a URL parameter
            const posts = await PostService.searchPostsByHashtag(hashtag);
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                posts,
            });
        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }

    async likePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId, } = req.params;
            const userId = req.user?.id as string;

            //   const userId = req.user.id; // Assume userId is obtained from authenticated user data
            const post = await PostService.likePost(postId, userId);
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Post liked successfully',
                post,
            });
        } catch (error) {
            next(error);
        }
    }

    async bookmarkPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;
            const userId = req.user?.id as string;

            const post = await PostService.bookmarkPost(postId, userId);
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Post bookmarked successfully',
                post,
            });
        } catch (error) {
            next(error);
        }
    }

    async changePostVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params; // Assume postId is passed as a URL parameter
            const { visibility, userId } = req.body; // New visibility status from the request body

            const post = await PostService.changePostVisibility(postId, userId, visibility);
            res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Post visibility updated successfully',
                post,
            });
        } catch (error) {
            next(error);
        }
    }




}

export default new PostController();