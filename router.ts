import {
  Router,
  RouterContext,
} from "./dependencies.ts";
import authController from "./controller/AuthController.ts";
import surveyController from './controller/SurveyController.ts';

const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Helloooo  world";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)

  // surverController
  .get("/api/survey", surveyController.getAllSurveyForUser)
  .get("/api/survey/:id", surveyController.getSingleSurvey)
  .post("/api/survey", surveyController.createSurvey)
  .put("/api/survey/:id", surveyController.updateSurvey)
  .delete("/api/survey/:id", surveyController.deleteSurvey)

export default router;
