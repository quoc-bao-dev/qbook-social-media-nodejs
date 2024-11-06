import { NextFunction, Request, Response } from 'express';
import StoryService, { IStoryPayload } from '../services/story.service';
import { ResponseBuilder } from 'src/utils/response';

class StoryController {
    async createStory(req: Request, res: Response, next: NextFunction) {
        try {

            const media = (Array.isArray(req.files) && req.files[0].filename) as string;

            const storyData: IStoryPayload = {
                userId: (req.user?.id as string),
                media: media,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Story sẽ hết hạn sau 24 giờ
            };

            const story = await StoryService.createStory(storyData);
            const response = new ResponseBuilder(story, 'Story created successfully', 201).build()
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new StoryController();