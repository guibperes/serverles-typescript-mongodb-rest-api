import { ObjectId } from "mongodb";

export const createObjectId = (id: string) => ObjectId.createFromHexString(id);

export const validateObjectId = (id: string) => ObjectId.isValid(id);
