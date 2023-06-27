import mongoose from "mongoose";
import { log } from "starless-logger";

export default async function connectMongoose() {
  await mongoose.connect(process.env.MONGODB_CONNECTION);
  log("Connected to Mongo database");
}
