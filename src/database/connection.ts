import { MongoClient } from "mongodb";

import { env } from "../env";
import { logger } from "../libs";

export const connect = async () => {
  try {
    const connection = await MongoClient.connect(env.MONGODB_URI);

    logger.info("Connected on database");
    return { isConnected: true, connection };
  } catch (error) {
    logger.info("Cannot connect on database");
    logger.error(error);

    return { isConnected: false };
  }
};

export const disconnect = async (connection: MongoClient) => {
  try {
    await connection.close();
    logger.info("Disconnected on database");
  } catch (error) {
    logger.info("Cannot disconnect on database");
    logger.error(error);
  }
};

export const getDatabase = (connection: MongoClient, name: string) =>
  connection.db(name);
