import { body } from 'express-validator';

export const addCommentValidator = [
    body('content').isString().withMessage('Content is required and must be a string'),
];