import { User } from "../../interfaces/User";
import { authenticate } from "../../middlewares";
import userModel from "../models/userModel";
import CustomError from "../../classes/CustomError";


export default {
  Query: {
    users: async (
      _parent: any,
      _args: any, 
      context: any
    ): Promise<User[] | CustomError> => {
      await authenticate(context.req, context.res, context.jwt);
      return await userModel.find();
    },
    userById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<User> => {
      const user = await userModel.findById(args.id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: { user_name: String, email: String },
    ): Promise<User> => {
      const user = await userModel.create({
        user_name: args.user_name,
        email: args.email
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    updateUser: async (
      _parent: undefined,
      args: { user_name: String, id: String },
    ): Promise<User> => {
      const user = await userModel.findByIdAndUpdate(
        args.id,
        args,
        { new: true },
      );
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    deleteUser: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<User> => {
      const user = await userModel.findByIdAndDelete(args.id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
}; 