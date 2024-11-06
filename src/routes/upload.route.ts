import { Router } from "express";
import uploadController from "src/controllers/upload.controller";
import upload from "src/middlewares/multer.middleware";

const uploadRouter = Router()

uploadRouter.post('/', upload('files'), uploadController.upload)

export default uploadRouter