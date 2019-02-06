import { body } from 'express-validator/check';
import User from '../models/user';

export function validateRegister() {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then(document => {
            if(document) return Promise.reject('Email address already exists');
          })
      })
      .normalizeEmail(),
    body('username')
      .custom((value, { req }) => {
        return User.findOne({ username: value })
          .then(document => {
            if(document) return Promise.reject('Username is already in use'); 
          })
      })
      .trim().not().isEmpty(),
    body('password').trim().isLength({ min: 5 })
  ]
}