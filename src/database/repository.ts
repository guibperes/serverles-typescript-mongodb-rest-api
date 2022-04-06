import { Collection, Db } from "mongodb";

import { createObjectId } from "./utils";

export abstract class BaseRepository<ENTITY> {
  readonly _collection: Collection;

  constructor(database: Db, collectionName: string) {
    this._collection = database.collection(collectionName);
  }

  async create(entity: ENTITY): Promise<boolean> {
    const result = await this._collection.insertOne(entity);

    return result.acknowledged;
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

  async findById(id: string): Promise<ENTITY> {
    return this._collection.findOne<ENTITY>({ _id: createObjectId(id) });
  }
}
