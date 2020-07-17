import {
  RouterContext,
  hashSync,
  compareSync,
  genSaltSync,
  Payload,
  setExpiration,
  Jose,
  makeJwt
} from "../dependencies.ts";

import User from "../models/User.ts";

const key = Deno.env.get('JWT_SECRET_KEY')!
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

class AuthController {
  async login(ctx: RouterContext) {
    const { value: { email, password } } = await ctx.request.body();

    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: 'Please provide email and password'
      }
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: 'Email does not exists!'
      }
      return;
    }

    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: 'Incorrect password!'
      }
      return;
    }

    const payload: Payload = {
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
    };

    const jwt = await makeJwt({ header, payload, key })

    ctx.response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt,
    }
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
