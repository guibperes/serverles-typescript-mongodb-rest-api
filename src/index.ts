import "reflect-metadata";
import { APIGatewayProxyHandler } from "aws-lambda";

import { connect, disconnect, getDatabase } from "./database";
import { http } from "./libs";
import { env } from "./env";
import { routes } from "./routes";

export const handler: APIGatewayProxyHandler = async event => {
  const { isConnected, connection } = await connect();

  if (!isConnected)
    return http.response({
      statusCode: 500,
      body: { error: "Database connection error" },
    });

  const database = getDatabase(connection, env.MONGODB_DATABASE);
  const route = routes.getRoute(event.httpMethod, event.path);

  const { statusCode, body, headers, sendCORS } = await route.handler(
    event,
    database,
  );

  await disconnect(connection);
  return http.response({ statusCode, body, headers, sendCORS });
};
