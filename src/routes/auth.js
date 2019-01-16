import { Router } from 'express';
import { catchAsync } from '../middlewares/errors';
import AuthController from '../controllers/authController';

export default () => {
    const api = Router();

    api.post('/register', AuthController.register);

    return api;
}