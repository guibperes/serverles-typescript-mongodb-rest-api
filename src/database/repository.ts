import { Collection, Db, ObjectId } from "mongodb";

import { createObjectId } from "./utils";

export interface RepositoryWriteOp {
  acknowledged: boolean;
  id: string;
}

export abstract class BaseRepository<ENTITY> {
  readonly _collection: Collection;

  constructor(database: Db, collectionName: string) {
    this._collection = database.collection(collectionName);
  }

  async create(entity: ENTITY): Promise<RepositoryWriteOp> {
    const { acknowledged, insertedId } = await this._collection.insertOne(
      entity,
    );

    return { acknowledged, id: insertedId.toString() };
  }

  async updateById(
    id: string,
    updatedFields: Partial<ENTITY>,
  ): Promise<boolean> {
    const result = await this._collection.updateOne(
      { _id: createObjectId(id) },
      { $set: updatedFields },
    );

    return result.acknowledged;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this._collection.deleteOne({
      _id: createObjectId(id),
    });

    return result.acknowledged;
  }

  async find(): Promise<ENTITY[]> {
    return this._collection.find<ENTITY>({}).toArray();
  }

  async findById(id: ObjectId): Promise<ENTITY> {
    return this._collection.findOne<ENTITY>({ _id: id });
  }
}
