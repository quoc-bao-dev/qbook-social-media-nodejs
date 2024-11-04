import Story from '../models/story.schema';

export interface IStoryPayload {
    userId: string;
    media: string;
    expiresAt: Date;
}
class StoryService {
    async createStory(storyData: IStoryPayload) {
        const story = new Story(storyData);
        return await story.save();
    }
}

export default new StoryService();