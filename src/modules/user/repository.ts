import { BaseRepository } from "../../database";
import { User } from "./entity";

export class UserRepository extends BaseRepository<User> {
  async findByEmail(email: string): Promise<User> {
    return this._collection.findOne<User>({ email });
  }
}
