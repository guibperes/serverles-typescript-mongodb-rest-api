import { Router } from "./libs";
import { counter, user } from "./modules";

export const routes = Router.create()
  .post("/counter", counter.hitCounter)
  .get("/counter", counter.getInfo)
  .post("/users", user.create)
  .get("/users/{id}", user.getInfo);
