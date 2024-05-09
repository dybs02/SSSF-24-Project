import {Request, Response, NextFunction} from 'express';
import { UserOutput } from '../../types/DBTypes';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import querystring from 'querystring';
import request from 'request';


const generateRandomString = (length: number) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

const STATE_KEY = 'spotify_auth_state';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    
    // TODO add proper scopes
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      })
    );
  } catch (error) {
    next(error);
  }
}

const logout = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('jwt', { httpOnly: true });
    res.clearCookie('user', { httpOnly: true });
    res.send('logged out');
  } catch (error) {
    next(error);
  }
}

const callback = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(FRONTEND_URL + '/error' +
      querystring.stringify({ message: 'state mismatch' })
    );
    return;
  }

  res.clearCookie(STATE_KEY);
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode !== 200) {
      res.redirect(FRONTEND_URL + '/error' +
        querystring.stringify({ message: 'invalid_token' })
      );
    }
    const access_token = body.access_token;
    const refresh_token = body.refresh_token;

    var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, async function(error, response, body) {
      let user = await userModel.findOne({ spotify_id: body.id });
      if (!user) {
        user = await userModel.create({
          display_name: body.display_name,
          avatar_url: body.images[1].url,
          spotify_id: body.id,
          email: body.email,
          country: body.country,
          access_token: access_token,
          refresh_token: refresh_token
        });
      }
  
      const state = generateRandomString(16);
      res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL!);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.cookie('state', state, { httpOnly: true });
      res.cookie('id', user._id, { httpOnly: true });
      res.redirect(FRONTEND_URL + `/auth-callback?state=${state}`);
    });
  });
}

const getJWT = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies['state'] : null;
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL!);
  res.header('Access-Control-Allow-Credentials', 'true');
  if (state === null || state !== storedState) {
    res.redirect(FRONTEND_URL + '/error' +
      querystring.stringify({ message: 'state mismatch' })
    );
    return;
  }

  const user = await userModel.findById(req.cookies.id).select('-__v -access_token -refresh_token');
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const tokenContent: UserOutput = {
    _id: user._id,
    email: user.email,
    display_name: user.display_name,
    avatar_url: user.avatar_url,
    spotify_id: user.spotify_id,
    country: user.country,
  };
  const token = jwt.sign(tokenContent, JWT_SECRET!);

  res.json({ jwt: token, user: tokenContent });
}


export {login, logout, callback, getJWT};
