import {Request, Response, NextFunction} from 'express';
import {UserOutput} from '../../types/DBTypes';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';


const userCurrentGet = async (
  req: Request<{}, {}, {}>,
  res: Response<UserOutput>,
  next: NextFunction
) => {
  try {
    const user = await userModel
      .findById(res.locals.user._id)
      .select('-access_token -refresh_token -__v');
    if (!user) {
      throw new CustomError('No user found', 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};


export {userCurrentGet};
