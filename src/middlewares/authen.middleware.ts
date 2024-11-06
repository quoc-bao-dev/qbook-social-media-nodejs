import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'src/config/config';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export const authMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    // Retrieve token from Authorization header
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1]; // Expected format "Bearer <token>"

    if (!token) {
        return next(new UnauthorizedError());
    }

    try {
        // Verify token with JWT_SECRET and decode the payload

        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as { id: string };
        req.user = decoded;
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.log(error);

        next(new ForbiddenError());
    }
};