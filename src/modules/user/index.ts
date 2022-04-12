import { RouteHandler, http, json, validate } from "../../libs";
import { createObjectId, validateObjectId } from "../../database";
import { UserCreateDTO } from "./dto";
import * as service from "./service";

export const create: RouteHandler = async (event, database) => {
  const userDTO = UserCreateDTO.from(json.parse(event.body));
  const { invalid, errors } = await validate.object(userDTO);

  if (invalid) return http.response({ statusCode: 400, body: { errors } });

  return service.create(database, userDTO);
};

export const getInfo: RouteHandler = async (event, database) => {
  const { id } = event.pathParameters;
  const isObjectIdValid = validateObjectId(id);

  if (!isObjectIdValid)
    return http.response({
      statusCode: 400,
      body: { error: "Invalid provided id" },
    });

  return service.getUser(database, createObjectId(id));
};
