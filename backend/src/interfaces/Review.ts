import {Types, Document} from 'mongoose';
import {User} from './User';
import {ReviewComment} from './ReviewComment';

interface Review extends Document {
  author: Types.ObjectId | User
  album_id: String
  title: String
  content: String
  rating: Number
  comments: [Types.ObjectId | ReviewComment]
  date: Date
  album: {
    id: String
    name: String
    artist: String
    image: String
  }
}

export {Review};
