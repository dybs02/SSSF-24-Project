import {Types, Document} from 'mongoose';
import {User} from './User';

interface ReviewComment extends Document {
  author: Types.ObjectId | User
  content: String
  date: Date
}

export {ReviewComment};
