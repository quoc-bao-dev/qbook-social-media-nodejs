import { Schema, model, Document } from 'mongoose';

export interface IStoryDocument extends Document {
    userId: Schema.Types.ObjectId;
    media: string;
    viewers: Schema.Types.ObjectId[];
    expiresAt: Date;
}

const storySchema = new Schema<IStoryDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    media: { type: String, required: true },
    viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

export default model<IStoryDocument>('Story', storySchema)