import { Document, Schema, model } from 'mongoose';

interface IUserDocument extends Document {
    username: string;
    email: string;
    hashedPassword: string;
    avatar?: string;
    bio?: string;
    friends: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    following: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUserDocument>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model<IUserDocument>('User', userSchema);