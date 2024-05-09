import express from 'express';
import {callback, getJWT, login, logout} from '../controllers/authController';
const router = express.Router();

router.get('/login/spotify', login);
router.get('/logout', logout);
router.get('/callback/spotify', callback);
router.get('/jwt', getJWT);

export default router;
