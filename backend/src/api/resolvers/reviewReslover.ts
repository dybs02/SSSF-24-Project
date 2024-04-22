import { Review } from "../../interfaces/Review";
import { ReviewComment } from "../../interfaces/ReviewComment";
import reviewCommentModel from "../models/reviewCommentModel";
import reviewModel from "../models/reviewModel";


export default {
  Query: {
    reviewById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<Review> => {
      const review = await reviewModel.findById(args.id)
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User'
          }
        })
        .populate('author');
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    },
    reviewsByAlbumId: async (
      _parent: undefined,
      args: { album_id: string },
    ): Promise<Review[]> => {
      return await reviewModel.find({album_id: args.album_id});
    },
    reviewsByUserId: async (
      _parent: undefined,
      args: { author: string },
    ): Promise<Review[]> => {
      return await reviewModel.find({author: args.author});
    }
  },
  Mutation: {
    createReview: async (
      _parent: undefined,
      args: { author: string, album_id: string, title: string, content: string, rating: number },
    ): Promise<Review> => {
      const review = await reviewModel.create({
        author: args.author,
        album_id: args.album_id,
        title: args.title,
        content: args.content,
        rating: args.rating,
        comments: []
      });
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    },
    createReviewComment: async (
      _parent: undefined,
      args: { author_id: string, review_id: string, content: string },
    ): Promise<ReviewComment> => {
      const comment = await reviewCommentModel.create({
        author: args.author_id,
        content: args.content,
        date: new Date()
      });
      if (!comment) {
        throw new Error('Review not found');
      }

      const reviewToUpdate = await reviewModel.findByIdAndUpdate(
        args.review_id,
        { $push: { comments: comment._id } },
        { new: true },
      );
      if (!reviewToUpdate) {
        throw new Error('Review not found');
      }

      return comment;
    },
    updateReview: async (
      _parent: undefined,
      args: { title: string, content: string, rating: number, id: string },
    ): Promise<Review> => {
      const review = await reviewModel.findByIdAndUpdate(
        args.id,
        args,
        { new: true },
      );
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    },
    deleteReview: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<Review> => {
      const review = await reviewModel.findByIdAndDelete(args.id);
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    },
  },
};