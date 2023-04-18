import { MongoClient } from "mongodb";
require('dotenv').config();

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  return client

}