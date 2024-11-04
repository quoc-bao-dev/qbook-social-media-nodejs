import bcrypt from 'bcryptjs';
import { generateAccessToken } from 'src/utils/token';
import User from '../models/user.schema';
import RefreshTokenService from '../services/refreshToken.service';
import { ForbiddenError } from '../utils/errors';
class AuthService {
    async login(email: string, password: string) {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const accessToken = generateAccessToken(user._id as string);
        const refreshToken = await RefreshTokenService.createRefreshToken(user._id as string);

        // Remove hashed password from user object
        const userWithoutPassword = { ...user.toObject(), hashedPassword: undefined }
        return { accessToken, refreshToken, userWithoutPassword };
    }
    async register(username: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, hashedPassword });

        await newUser.save();

        const userWithoutPassword = { ...newUser.toObject(), hashedPassword: undefined };

        // Tạo access token
        const accessToken = generateAccessToken(newUser._id as string);

        // Tạo refresh token thông qua RefreshTokenService
        const refreshToken = await RefreshTokenService.createRefreshToken(newUser._id as string);

        return { accessToken, refreshToken, user: userWithoutPassword };
    }

    async refreshAccessToken(userId: string, refreshToken: string) {
        // Check if refresh token is valid
        const isValidRefreshToken = await RefreshTokenService.verifyAndCleanRefreshToken(userId, refreshToken);

        if (!isValidRefreshToken) {
            throw new ForbiddenError('Invalid or expired refresh token');
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(userId);
        return newAccessToken;
    }
}

export default new AuthService();