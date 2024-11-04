import { json, urlencoded } from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import errorHandler from "./middlewares/errorHandller";
import router from "./routes";
import path from "path";
import cors from "cors";

const app = express();

// cho phép các domain khác nhau truy cập
app.use(cors());
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

