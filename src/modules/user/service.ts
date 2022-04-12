import { Db, ObjectId } from "mongodb";

import { http } from "../../libs";
import { UserRepository } from "./repository";
import { User } from "./entity";
import { UserCreateDTO } from "./dto";

const getRepository = (database: Db) => new UserRepository(database, "user");

export const create = async (
  database: Db,
  userCreateDTO: UserCreateDTO,
): Promise<http.Response> => {
  const repository = getRepository(database);
  const user = User.from(userCreateDTO);

  const userExistsByEmail = await repository.findByEmail(userCreateDTO.email);

  if (userExistsByEmail)
    return http.response({
      statusCode: 409,
      body: { error: "User already exists with provided email" },
    });

  const { acknowledged, id } = await repository.create(user);

  if (!acknowledged)
    return http.response({
      statusCode: 500,
      body: { error: "Internal database error" },
    });

  return http.response({ statusCode: 201, body: { id } });
};

export const getUser = async (
  database: Db,
  id: ObjectId,
): Promise<http.Response> => {
  const repository = getRepository(database);
  const user = await repository.findById(id);

  if (!user)
    return http.response({
      statusCode: 404,
      body: { error: "Cannot find user with provided id" },
    });

  return http.response({ statusCode: 200, body: user });
};
