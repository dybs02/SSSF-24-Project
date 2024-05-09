import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import userModel from '../src/api/models/userModel';
import { UserOutput } from '../src/interfaces/User';

import {getNotFound} from './testFunctions';
import {
  deleteReview,
  postReview,
  postReviewComment,
  updateReview,
} from './reviewFunctions';
import { Review } from '../src/interfaces/Review';
import reviewModel from '../src/api/models/reviewModel';
import reviewCommentModel from '../src/api/models/reviewCommentModel';


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
    reviewModel.deleteMany({}).exec();
    reviewCommentModel.deleteMany({}).exec();
    token = await generateJWT() as string;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let review: Partial<Review>;


  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  it('should create a new review', async () => {
    review = await postReview(
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

  it('should create a review comment', async () => {
    const reviewComment = await postReviewComment(
      app,
      {
        reviewId: review.id,
        content: 'Comment content',
      },
      token
    );
  });

  it('should update a review', async () => {
    review = await updateReview(
      app,
      {
        updateReviewId: review.id,
        title: 'Review title - updated',
        content: 'Review content - updated',
        rating: 2.5,
      },
      token
    );
  });

  it('should delete a review', async () => {
    await deleteReview(app, {deleteReviewId: review.id}, token);
  });

});
