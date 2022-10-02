import mongoose from "mongoose";
import { StartServer } from "../router";
import { config } from "./config/config";

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to mongo");
    StartServer();
  })
  .catch((error) => {
    console.log("Error found , enable to connect");
    console.error(error);
  });
