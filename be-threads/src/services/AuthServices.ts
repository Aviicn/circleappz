import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../utils/validator/Auth";

import db from "../db";
export default new (class AuthServices {
  async register(reqBody: any): Promise<any> {
    try {
      const { error, value } = registerSchema.validate(reqBody);

      if (error) throw new Error(error.details[0].message);

      const isEmailRegistered = await db.user.findUnique({
        where: {
          email: value.email,
        },
      });

      if (isEmailRegistered) {
        throw new Error("Email is already registered!");
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = await db.user.create({
        data: {
          fullname: value.fullname,
          username: value.username,
          email: value.email,
          password: hashedPassword,
        },
      });

      return {
        message: "Register success!",
        user: user,
      };
    } catch (err) {
      // console.log("err", err);
      throw new Error("Something went wrong on the server!");
    }
  }

  async login(reqBody: any): Promise<any> {
    try {
      const { error, value } = loginSchema.validate(reqBody);

      const user = await db.user.findUnique({
        where: {
          username: value.username,
        },
      });

      if (!user) {
        throw new Error("Username not found");
      }

      const isPasswordCorrect = await bcrypt.compare(
        value.password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }

      const token = await jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "23h",
      });

      return {
        token,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await db.user.findUnique({
        where: {
          id: loginSession.user.id,
        },
      });

      return {
        message: "Token is valid!",
        user: user,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
})();
