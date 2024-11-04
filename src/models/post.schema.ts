import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPostDocument extends Document {
    userId: Schema.Types.ObjectId; // User ID of the post creator
    content: string; // Content of the post
    media: string[]; // Array of media file paths (images or videos)
    visibility: string; // Visibility setting (e.g., public, private)
    hashtags: string[]; // Array of hashtags
    likes: Types.ObjectId[]; // Array of user IDs who liked the post
    saves: Types.ObjectId[]; // Array of user IDs who saved the post
}

const PostSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    media: { type: [String], default: [] }, // Array to store media file paths
    visibility: { type: String, default: 'public' },
    hashtags: { type: [String], default: [] },
    likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    saves: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
}, { timestamps: true });

export default mongoose.model<IPostDocument>('Post', PostSchema);
