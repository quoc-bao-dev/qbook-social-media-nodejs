import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { config } from "./config/config";
import errorHandler from "./middlewares/errorHandller";
import router from "./routes";

const app = express();

// cho phép các domain khác nhau truy cập

app.use(cors({
    origin: ['http://localhost:3000', '*'],
    credentials: true
}));
app.use(cookieParser());

// Định nghĩa body-parser
app.use(urlencoded({ extended: true }));
app.use(json());

// Kết nối MongoDB
mongoose.connect(config.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use('/media', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', router)

app.use(errorHandler);

export default app;

