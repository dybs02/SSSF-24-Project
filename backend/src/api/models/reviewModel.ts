import mongoose from 'mongoose';
import { Review } from '../../interfaces/Review';

const reviewModel = new mongoose.Schema<Review>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  album_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'ReviewComment',
    required: true,
  },
});

export default mongoose.model<Review>('Review', reviewModel);
