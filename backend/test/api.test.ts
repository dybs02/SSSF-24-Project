import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import userModel from '../src/api/models/userModel';
import { UserOutput } from '../src/interfaces/User';

import {getNotFound} from './testFunctions';
import {
  postReview
} from './reviewFunctions';


const generateJWT = async () => {
  const users = await userModel.find().select('-__v -access_token -refresh_token');
  const user = users[0];
  if (!user) {
    console.error('No user found, unable to generate JWT');
    return;
  }

  const tokenContent: UserOutput = {
    _id: user._id,
    email: user.email,
    display_name: user.display_name,
    avatar_url: user.avatar_url,
    spotify_id: user.spotify_id,
    country: user.country,
  };
  const token = jwt.sign(tokenContent, process.env.JWT_SECRET!);
  return token;
};


describe('Testing graphql api', () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DATABASE_URL as string);
    token = await generateJWT() as string;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  it('should create a new review', async () => {
    await postReview(
      app,
      {
        albumId: '02w1xMzzdF2OJxTeh1basm',
        title: 'Review title',
        content: 'Review content',
        rating: 4.5,
      },
      token
    );
  });

});
