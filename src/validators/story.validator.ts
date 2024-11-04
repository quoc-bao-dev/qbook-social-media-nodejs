import { body } from 'express-validator';

const createStoryValidator = [
    body('media').notEmpty().withMessage('Media URL is required'), // Đảm bảo media không rỗng
];

export default createStoryValidator;