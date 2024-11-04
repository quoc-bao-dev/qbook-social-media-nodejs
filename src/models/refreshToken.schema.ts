import mongoose, { Document, Schema } from 'mongoose';

export interface IRefreshTokenDocument extends Document {
    userId: Schema.Types.ObjectId; // ID của người dùng
    token: string[]; // Refresh token
    createdAt: Date; // Thời gian tạo
    expiresAt: Date; // Thời gian hết hạn
}

const RefreshTokenSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' }, // Hết hạn sau 7 ngày
});

export default mongoose.model<IRefreshTokenDocument>('RefreshToken', RefreshTokenSchema);
