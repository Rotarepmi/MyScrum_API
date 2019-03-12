import { Router } from 'express';
import { catchAsync } from '../middlewares/errors';
import { validateRegister } from '../middlewares/validators';
import AuthController from '../controllers/authController';

export default () => {
  const api = Router();

  api.post('/login', catchAsync(AuthController.login));

  api.post('/register', validateRegister(), catchAsync(AuthController.register));

  return api;
}