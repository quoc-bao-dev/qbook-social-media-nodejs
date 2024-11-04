import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" });

export const config = {
    PORT: process.env.PORT || 3006,
    MONGO_URI: process.env.MONGODB_URI || "",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "",
    REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE || "",
};
