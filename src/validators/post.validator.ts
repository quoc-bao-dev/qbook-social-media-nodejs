import { body } from 'express-validator';

export const editPostValidator = [
    body('content').optional().isString().withMessage('Content must be a string'),
    body('media')
        .optional()
        .isArray()
        .withMessage('Media must be an array of URLs')
        .bail()
        .custom((media: any[]) => media.every((url) => typeof url === 'string'))
        .withMessage('Each media URL must be a string'),
    body('visibility')
        .optional()
        .isIn(['public', 'private', 'friends'])
        .withMessage('Visibility must be either public, private, or friends'),
];