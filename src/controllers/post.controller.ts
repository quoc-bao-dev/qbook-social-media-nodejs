import { NextFunction, Request, Response } from 'express';
import PostService from '../services/post.service';
import { ResponseBuilder } from 'src/utils/response';

export type CreatePostPayload = {
    userId: string;
    content: string;
    media: string[];
    visibility: string;
    hashtags: string[];
}

class PostController {

    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id as string;// Assume userId is passed as a URL parameter
            const result = await PostService.getPostsByUser(userId);

            const response = new ResponseBuilder(result, 'Posts fetched successfully').build()

            res.status(200).json(response);

        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }

    async getPostByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;// Assume userId is passed as a URL parameter
            const result = await PostService.getPostsByUser(userId);
            const response = new ResponseBuilder(result, 'Posts fetched successfully').build()

            res.status(200).json(response);
        } catch (error) {
            next(error); // Pass the error to the next middleware (error handler)
        }
    }
    async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id as string;// Assume userId is passed as a URL parameter
            const { content, media, visibility, hashtags } = req.body;
            const payload: CreatePostPayload = { content, media, visibility, hashtags, userId };
            const newPost = await PostService.createPost(payload);

            const response = new ResponseBuilder(newPost, 'Post created successfully', 201).build()

            res.status(201).json(response);
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

            const response = new ResponseBuilder(updatedPost, 'Post updated successfully').build()

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async searchPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const { hashtag } = req.params; // Assume hashtag is passed as a URL parameter
            const posts = await PostService.searchPostsByHashtag(hashtag);

            const response = new ResponseBuilder(posts, 'Posts fetched successfully').build()

            res.status(200).json(response);
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

            const response = new ResponseBuilder(post, 'Post liked successfully').build()

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async bookmarkPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params;
            const userId = req.user?.id as string;

            const post = await PostService.bookmarkPost(postId, userId);
            const response = new ResponseBuilder(post, 'Post bookmarked successfully').build()
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async changePostVisibility(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params; // Assume postId is passed as a URL parameter
            const { visibility, userId } = req.body; // New visibility status from the request body

            const post = await PostService.changePostVisibility(postId, userId, visibility);
            const response = new ResponseBuilder(post, 'Post visibility updated successfully').build()
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }




}

export default new PostController();