import express from 'express';
import {callback, login} from '../controllers/authController';
const router = express.Router();

router.get('/login/spotify', login);
router.get('/callback/spotify', callback);

export default router;
