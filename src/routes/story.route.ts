import express from 'express';
import StoryController from '../controllers/story.controller';
import createStoryValidator from '../validators/story.validator';
import { authMiddleware } from 'src/middlewares/authen.middleware';
import upload from 'src/middlewares/multer.middleware';

const storyRouter = express.Router();

// Route để tạo story
storyRouter.post('/', createStoryValidator, authMiddleware, upload, StoryController.createStory);

export default storyRouter;