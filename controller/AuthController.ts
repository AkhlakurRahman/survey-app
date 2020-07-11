import {
  RouterContext,
  hashSync,
  compareSync,
  genSaltSync,
} from "../dependencies.ts";

import User from "../models/User.ts";

class AuthController {
  login() {
    //
  }

  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    let user = await User.findOne({ email });
    if (user) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Email already exists!",
      };

      return;
    }

    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.createUser();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

const authController = new AuthController();

export default authController;
