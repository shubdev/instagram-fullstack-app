import dotenv from "dotenv";

dotenv.config();

//if any environment variable is missing then throw an error.
if (
  !process.env.MONGO_URI ||
  !process.env.PORT ||
  !process.env.IMAGEKIT_PUBLIC_KEY ||
  !process.env.IMAGEKIT_PRIVATE_KEY ||
  !process.env.IMAGEKIT_URL_ENDPOINT ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.JWT_TOKEN
) {
  throw new Error("Please provide all the environment variables");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_TOKEN: process.env.JWT_TOKEN,
};
