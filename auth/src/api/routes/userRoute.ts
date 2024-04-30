import express from 'express';
import {authenticate} from '../../middlewares';
import { userCurrentGet } from '../controllers/userController';

const router = express.Router();

router
  .route('/')
  .get(authenticate, userCurrentGet);

export default router;
