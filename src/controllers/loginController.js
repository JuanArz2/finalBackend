import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "../helpers/generateTokenFunc.js";
import userModel from "../models/usersModel.js";
import { decode } from "jsonwebtoken";

const loginController = {
  login: async (sol, req) => {
    try {
      const { email, password } = sol.body; // Destructuración objeto
      const foundUser = await userModel.findOne({
        email: email,
      });
      const validPassword = await bcryptjs.compare(
        password,
        foundUser.password
      );
      if (validPassword) {
        const token = await generateToken({
          id: foundUser._id,
          name: foundUser.name,
        });
        req.json({
          state: "Successful",
          mesage: "Access allowed",
          data: token,
        });
      } else {
        req.json({
          state: "Error",
          mesage: "Access denied",
          data: null,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error login",
        data: error,
      });
    }
  },

  tokenValidation: async (sol, req) => {
    try {
      const token = sol.params.token;
      const decoded = await verifyToken(token);
      console.log("DECODED: ", decoded);
      if (decoded.id) {
        req.json({
          state: "Successful",
          mesage: "Valid token",
          data: decoded,
        });
      } else {
        req.json({
          state: "Error",
          mesage: "Invalid token",
          data: null,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error validating token",
        data: error,
      });
    }
  },
};

export default loginController;
