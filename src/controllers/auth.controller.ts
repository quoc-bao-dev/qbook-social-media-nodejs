import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ResponseBuilder } from 'src/utils/response';
import AuthService from '../services/auth.service';
import RefreshTokenService from '../services/refreshToken.service';
import { UnauthorizedError } from '../utils/errors';
class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new Error('Validation Error: ' + JSON.stringify(errors.array())));
        }

        const { email, password } = req.body;

        try {
            const { accessToken, refreshToken, userWithoutPassword: user } = await AuthService.login(email, password);
            const payload = { accessToken, refreshToken, user }
            const response = new ResponseBuilder(payload, 'User logged in successfully').build()
            res.status(200).json(response);
        } catch (error: any) {
            next(new Error('Login failed: ' + error.message));
        }
    }
    async register(req: Request, res: Response, next: NextFunction) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Ném lỗi cho middleware xử lý lỗi
            return next(new Error('Validation Error: ' + JSON.stringify(errors.array())));
        }

        const { username, email, password } = req.body;

        try {
            const { accessToken, refreshToken, user } = await AuthService.register(username, email, password);

            const payload = { accessToken, refreshToken, user }

            const response = new ResponseBuilder(payload, 'User registered successfully', 201).build()

            res.status(201).json(response);
        } catch (error: any) {
            // Ném lỗi cho middleware xử lý lỗi
            next(new Error('Registration failed: ' + error.message));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                throw new Error('User ID not found');
            }

            await RefreshTokenService.logout(userId);

            const response = new ResponseBuilder(null, 'User logged out successfully').build()

            res.status(200).json(response);
        } catch (error: any) {
            next(new Error('Logout failed: ' + error.message));
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, refreshToken } = req.body;

            if (!userId || !refreshToken) {
                return next(new UnauthorizedError('User ID and refresh token are required'));
            }

            // Generate new access token
            const newAccessToken = await AuthService.refreshAccessToken(userId, refreshToken);

            const response = new ResponseBuilder({ accessToken: newAccessToken }, 'Access token refreshed successfully').build()

            res.status(200).json(response);
        } catch (error) {
            next(new Error('Refresh token failed')); // Handle with error handler middleware
        }
    }
}

export default new AuthController();