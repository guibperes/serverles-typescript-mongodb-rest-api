import { Router } from "./libs";
import { counter } from "./modules";

export const routes = Router.create()
  .post("/counter", counter.hitCounter)
  .get("/counter", counter.getInfo);
