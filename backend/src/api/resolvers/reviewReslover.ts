import { Review } from "../../interfaces/Review";
import { ReviewComment } from "../../interfaces/ReviewComment";
import { authenticate } from "../../middlewares";
import { getAlbumById } from "../../utils/spotify";
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
            model: 'User',
            select: '-access_token -refresh_token -__v'
          }
        })
        .populate({
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        });
      if (!review) {
        throw new Error('Review not found');
      }

      const album = await getAlbumById(review.album_id as string);
      review.album = {
        id: album.data.id,
        name: album.data.name,
        artist: album.data.artists.map((artist: any) => artist.name).join(", "),
        image: album.data.images[0].url,
      }

      return review;
    },
    reviewByAlbumId: async (
      _parent: undefined,
      args: { album_id: string },
      context: any
    ): Promise<Review> => {
      await authenticate(context.req, context.res);
      const review = await reviewModel.findOne({album_id: args.album_id, author: context.res.locals.user._id})
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
      if (!review) {
        throw new Error('Review not found');
      }

      return review;
    },
    reviewsByAlbumId: async (
      _parent: undefined,
      args: { album_id: string },
    ): Promise<Review[]> => {
      const reviews = await reviewModel.find({album_id: args.album_id})
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
    if (!reviews) {
      throw new Error('Review not found');
    }
    return reviews;
    },
    reviewsByUserId: async (
      _parent: undefined,
      args: { author: string },
    ): Promise<Review[]> => {
      const reviews = await reviewModel.find({author: args.author})
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
    if (!reviews) {
      throw new Error('Review not found');
    }
    return reviews;
    },
    reviewsMostRecent: async (
      _parent: undefined,
      args: { limit: number },
    ): Promise<Review[]> => {
      const reviews = await reviewModel.find()
      .sort({ _id: -1 })
      .limit(args.limit > 10 ? 10 : args.limit)
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
      if (!reviews) {
        throw new Error('Reviews not found');
      }

      for (const review of reviews) {
        const album = await getAlbumById(review.album_id as string);
        review.album = {
          id: album.data.id,
          name: album.data.name,
          artist: album.data.artists.map((artist: any) => artist.name).join(", "),
          image: album.data.images[0].url,
        }
      }

      return reviews;
    },
    reviewsMostRecentByUserId: async (
      _parent: undefined,
      args: { user_id: string, limit: number },
      context: any,
    ): Promise<Review[]> => {
      const reviews = await reviewModel.find({ author: args.user_id })
      .sort({ _id: -1 })
      .limit(args.limit > 10 ? 10 : args.limit)
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
      if (!reviews) {
        throw new Error('Reviews not found');
      }

      for (const review of reviews) {
        const album = await getAlbumById(review.album_id as string);
        review.album = {
          id: album.data.id,
          name: album.data.name,
          artist: album.data.artists.map((artist: any) => artist.name).join(", "),
          image: album.data.images[0].url,
        }
      }

      return reviews;
    }
  },
  Mutation: {
    createReview: async (
      _parent: undefined,
      args: { album_id: string, title: string, content: string, rating: number },
      context: any
    ): Promise<Review> => {
      await authenticate(context.req, context.res);

      const review = await reviewModel.create({
        author: context.res.locals.user._id,
        album_id: args.album_id,
        title: args.title,
        content: args.content,
        rating: args.rating,
        comments: [],
        date: new Date()
      });
      const populatedReview = await reviewModel
        .findById(review._id)
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User',
            select: '-access_token -refresh_token -__v'
          }
        })
        .populate({
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        });
      if (!review || !populatedReview) {
        throw new Error('Review error');
      }
      return populatedReview;
    },
    createReviewComment: async (
      _parent: undefined,
      args: { review_id: string, content: string },
      context: any
    ): Promise<ReviewComment> => {
      await authenticate(context.req, context.res);

      // TODO sanitize content ???
      const comment = await reviewCommentModel.create({
        author: context.res.locals.user._id,
        content: args.content,
        date: new Date()
      });
      if (!comment) {
        throw new Error('Review not found');
      }

      const reviewToUpdate = await reviewModel
      .findByIdAndUpdate(
        args.review_id,
        { $push: { comments: comment._id } },
        { new: true },
      )
      if (!reviewToUpdate) {
        throw new Error('Review not found');
      }

      const populatedComment = await reviewCommentModel
        .findById(comment._id)
        .populate({
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        });
      if (!populatedComment) {
        throw new Error('Comment not found');
      }

      return populatedComment;
    },
    updateReview: async (
      _parent: undefined,
      args: { title: string, content: string, rating: number, id: string },
      context: any
    ): Promise<Review> => {
      await authenticate(context.req, context.res);
      const review = await reviewModel.findById(args.id);
      if (!review) {
        throw new Error('Review not found');
      }
      if (review.author.toString() !== context.res.locals.user._id) {
        throw new Error('Unauthorized');
      }

      // TODO sanitize content ???
      const updatedReview = await reviewModel
      .findByIdAndUpdate(
        args.id,
        {...args, date: new Date()},
        { new: true }, 
      )
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
          select: '-access_token -refresh_token -__v'
        }
      })
      .populate({
        path: 'author',
        model: 'User',
        select: '-access_token -refresh_token -__v'
      });
      if (!updatedReview) {
        throw new Error('Review not found');
      }
      return updatedReview;
    },
    deleteReview: async (
      _parent: undefined,
      args: { id: string },
      context: any
    ): Promise<Review> => {
      await authenticate(context.req, context.res);
      const review = await reviewModel.findById(args.id);
      if (!review) {
        throw new Error('Review not found');
      }
      if (review.author.toString() !== context.res.locals.user._id) {
        throw new Error('Unauthorized');
      }

      const deletedReview = await reviewModel.findByIdAndDelete(args.id);
      if (!deletedReview) {
        throw new Error('Review not found');
      }
      return deletedReview;
    },
  },
};