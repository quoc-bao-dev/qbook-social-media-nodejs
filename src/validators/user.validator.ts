import { body } from 'express-validator';
export const updateUserValidator = [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('hashedPassword').isString().notEmpty().withMessage('Password is required'),
    body('avatar').optional().isString(),
    body('bio').optional().isString(),
];
