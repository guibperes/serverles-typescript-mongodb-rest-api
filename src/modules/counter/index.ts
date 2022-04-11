import { RouteHandler, countAPI, http } from "../../libs";

export const getInfo: RouteHandler = async () => {
  const response = await countAPI.getInfo();

  return http.response({ statusCode: 200, body: response });
};

export const hitCounter: RouteHandler = async () => {
  const response = await countAPI.hitCounter();

  return http.response({ statusCode: 200, body: response });
};
