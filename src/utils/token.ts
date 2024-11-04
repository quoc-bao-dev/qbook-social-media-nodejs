import jwt from 'jsonwebtoken';
import { config } from 'src/config/config';

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        config.ACCESS_TOKEN_SECRET!,
        { expiresIn: config.ACCESS_TOKEN_EXPIRE });
}

export const generateRefreshToken = (userId: string) => {
    return jwt.sign(
        { id: userId },
        config.REFRESH_TOKEN_SECRET!,
        { expiresIn: config.REFRESH_TOKEN_EXPIRE });
}
