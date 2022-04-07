/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { APIGatewayProxyEvent } from "aws-lambda";

import { Response } from "./http";

export type RouteHandler = (event: APIGatewayProxyEvent) => Promise<Response>;

export interface Route {
  method: string;
  handler: RouteHandler;
}

export class Router {
  readonly _routes = new Map<string, Route>();

  private constructor() {}

  static create(): Router {
    return new Router();
  }

  private getKey(method: string, path: string): string {
    return `${method}_${path}`;
  }

  private addRoute(
    method: string,
    path: string,
    handler: RouteHandler,
  ): Router {
    this._routes.set(this.getKey(method, path), { method, handler });
    return this;
  }

  getRoute(method: string, path: string) {
    return this._routes.get(this.getKey(method, path));
  }

  post(path: string, handler: RouteHandler): Router {
    return this.addRoute("POST", path, handler);
  }

  get(path: string, handler: RouteHandler): Router {
    return this.addRoute("GET", path, handler);
  }

  patch(path: string, handler: RouteHandler): Router {
    return this.addRoute("PATCH", path, handler);
  }

  delete(path: string, handler: RouteHandler): Router {
    return this.addRoute("DELETE", path, handler);
  }
}
