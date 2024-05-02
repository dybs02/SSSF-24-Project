import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import ErrorResponse from './interfaces/ErrorResponse';
import CustomError from './classes/CustomError';
import { UserOutput } from './interfaces/User';
import { GraphQLError } from 'graphql';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  console.error('errorHandler', err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  token: string
) => {
  // res.locals.user = {
  //   _id: '662e369a71a91357d5607cd6',
  //   display_name: 'test',
  //   avatar_url: 'test',
  //   spotify_id: 'test',
  //   email: 'test',
  //   country: 'test',
  // } as UserOutput;
  // return;
  try {
    if (!token) {
      throw new Error('No jwt provided');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not set');
    }

    const tokenContent = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as UserOutput;

    res.locals.user = tokenContent;
  } catch (error) {
    throw new Error('Not authorized');
  }
};

export {notFound, errorHandler, authenticate};
