import mongoose, { Document, Schema } from 'mongoose';

export interface IRelationshipDocument extends Document {
    userId: Schema.Types.ObjectId;
    targetId: Schema.Types.ObjectId;
    type: 'follow' | 'friend';
    status: 'pending' | 'accepted' | 'rejected' | 'blocked' | 'active';
    createdAt: Date;
}

const relationshipSchema = new Schema<IRelationshipDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['follow', 'friend'], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'blocked', 'active'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRelationshipDocument>('Relationship', relationshipSchema);