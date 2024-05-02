import { User } from "../../interfaces/User";
import { authenticate } from "../../middlewares";
import userModel from "../models/userModel";


export default {
  Query: {
    userCurrent: async (
      _parent: any,
      _args: any, 
      context: any
    ): Promise<User> => {
      await authenticate(context.req, context.res, context.jwt);
      const user = await userModel.findById(context.res.locals.user._id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
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
}; 