import {
  RouterContext,
} from '../dependencies.ts'

class SurveyController {
  async getAllSurveyForUser(ctx: RouterContext) {
    ctx.response.body = []
  }

  async getSingleSurvey(ctx: RouterContext) {

  }

  async createSurvey(ctx: RouterContext) {

  }

  async updateSurvey(ctx: RouterContext) {

  }

  async deleteSurvey(ctx: RouterContext) {

  }
}

const surveyController = new SurveyController();

export default surveyController;