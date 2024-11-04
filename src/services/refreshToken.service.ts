import jwt from 'jsonwebtoken';
import { generateRefreshToken } from 'src/utils/token';
import { config } from '../config/config';
import RefreshToken from '../models/refreshToken.schema';

class RefreshTokenService {
    async createRefreshToken(userId: string): Promise<string> {
        const refreshToken = generateRefreshToken(userId); // Tạo refresh token mới

        // Kiểm tra xem đã tồn tại refresh token cho userId hay chưa
        const existingToken = await RefreshToken.findOne({ userId });

        if (existingToken) {
            // Nếu đã tồn tại, thêm token mới vào mảng token
            existingToken.token.push(refreshToken);
            await existingToken.save();
        } else {
            // Nếu chưa tồn tại, tạo tài liệu mới cho người dùng
            await new RefreshToken({ userId, token: [refreshToken] }).save();
        }

        return refreshToken;
    }


    async logout(userId: string): Promise<void> {
        await RefreshToken.updateMany(
            { userId },
            { $set: { token: [] } }
        );
    }

    async verifyAndCleanRefreshToken(userId: string, token: string): Promise<boolean> {
        const refreshTokenDoc = await RefreshToken.findOne({ userId });

        if (!refreshTokenDoc) return false;

        // Remove expired tokens
        refreshTokenDoc.token = refreshTokenDoc.token.filter((t) => {
            try {
                jwt.verify(t, config.REFRESH_TOKEN_SECRET); // Check if token is still valid
                return true; // Keep valid tokens
            } catch (error) {
                return false; // Filter out expired tokens
            }
        });

        await refreshTokenDoc.save(); // Save the updated document

        // Check if the requested token is in the updated token list
        return refreshTokenDoc.token.includes(token);
    }
}

export default new RefreshTokenService();
