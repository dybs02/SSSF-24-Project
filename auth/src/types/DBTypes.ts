import {Document} from 'mongoose';

type User = Partial<Document> & {
  display_name: string;
  avatar_url: string;
  spotify_id: string;
  email: string;
  country: string;
  access_token: string;
  refresh_token: string;
};

type UserOutput = Omit<User, 'access_token' | 'refresh_token'>;

export {
  User,
  UserOutput,
};
