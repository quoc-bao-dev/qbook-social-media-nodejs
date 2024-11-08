import { ForbiddenError, UnauthorizedError } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'src/config/config';

export const authMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    // Retrieve token from Authorization header
    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1]; // Expected format "Bearer <token>"

    console.log('authMiddleware: ', req.cookies);
    console.log(req.cookies['accessToken']);


    const token = req.cookies['accessToken'];


    if (!token) {
        return next(new UnauthorizedError());
    }

    try {
        // Verify token with JWT_SECRET and decode the payload
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as { id: string };
        req.user = decoded;
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        next(new ForbiddenError());
    }
};