import mongoose, { Schema, Document } from 'mongoose';

export interface ICommentDocument extends Document {
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    content: string;
}

const commentSchema = new Schema<ICommentDocument>(
    {
        postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ICommentDocument>('Comment', commentSchema);