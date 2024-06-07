import bcrypt from "bcryptjs";
import usersModel from "../models/usersModel.js";

const usersController = {
  createUser: async (sol, req) => {
    try {
      const { name, email, password } = sol.body;
      const protectedPassword = await bcrypt.hash(password, 10);
      const newUser = new usersModel({
        name,
        email,
        password: protectedPassword,
      });
      const createdUser = await newUser.save();
      if (createdUser._id) {
        req.json({
          state: "Success",
          mesage: "User created",
          data: createdUser._id,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error creating user",
        data: error,
      });
    }
  },
  readUser: async (sol, req) => {
    try {
      const foundUser = await usersModel.findById(sol.params.id);
      if (foundUser._id) {
        req.json({
          state: "Success",
          mesage: "User found",
          data: foundUser,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding user",
        data: error,
      });
    }
  },
  readAllUsers: async (sol, req) => {
    try {
      const allUsers = await usersModel.find();
      req.json({
        state: "Success",
        mesage: "Users found",
        data: allUsers,
      });
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error finding all users",
        data: error,
      });
    }
  },
  updateUser: async (sol, req) => {
    try {
      const userUpdated = await usersModel.findByIdAndUpdate(
        sol.params.id,
        sol.body
      );
      if (userUpdated._id) {
        req.json({
          state: "Success",
          mesage: "User updated",
          data: userUpdated._id,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error updating user",
        data: error,
      });
    }
  },
  deleteUser: async (sol, req) => {
    try {
      const deletingUser = await usersModel.findByIdAndDelete(sol.params.id);
      if (deletingUser._id) {
        req.json({
          state: "Success",
          mesage: "User deleted",
          data: null,
        });
      }
    } catch (error) {
      req.json({
        state: "Error",
        mesage: "Error deleting user",
        data: error,
      });
    }
  },
};

export default usersController;
