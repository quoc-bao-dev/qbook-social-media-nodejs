import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "src/utils/response";

class UploadController {
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req.files as Express.Multer.File[];

            if (!files) {
                next(new Error('No files uploaded'));
            }

            const payload = files.map((file: Express.Multer.File) => {
                return file.filename
            })

            const response = new ResponseBuilder(payload, 'Files uploaded successfully', 200).build();

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new UploadController();