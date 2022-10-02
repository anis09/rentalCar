import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGODB_PROTOCOL = process.env.MONGODB_PROTOCOL || "";
const MONGODB_HOST = process.env.MONGODB_HOST || "";

const MONGO_URL = `${MONGODB_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGODB_HOST}`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
