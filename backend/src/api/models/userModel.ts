import mongoose from 'mongoose';
import { User } from '../../interfaces/User';


const userSchema = new mongoose.Schema<User>({
  display_name: {
    type: String,
    reqired: true,
  },
  avatar_url: {
    type: String,
    reqired: true,
  },
  spotify_id: {
    type: String,
    reqired: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    reqired: true,
  },
  refresh_token: {
    type: String,
    reqired: true,
  },
});

export default mongoose.model<User>('User', userSchema);
