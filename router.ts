import {
  Router,
  RouterContext,
} from "./dependencies.ts";
import authController from "./controller/AuthController.ts";

const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Helloooo  world";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register);

export default router;
