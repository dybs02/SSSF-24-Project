import mongoose from "mongoose";
import { ReviewComment } from "../../interfaces/ReviewComment";

const reviewCommentModel = new mongoose.Schema<ReviewComment>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ReviewComment>('ReviewComment', reviewCommentModel);