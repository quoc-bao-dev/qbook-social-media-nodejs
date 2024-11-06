// src/middleware/multer.ts
import multer from 'multer';
import path from 'path';

// Define the storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Specify the folder to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save the file with a unique name
    },
});

// File filter for images and videos
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|avi/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept file
    } else {
        cb(new Error('Error: File type not supported!')); // Reject file
    }
};

const upload = (key: string = 'media') => multer({
    storage: storage,
    fileFilter: fileFilter,
}).array(key, 10); // Accept multiple files up to 10

export default upload;
