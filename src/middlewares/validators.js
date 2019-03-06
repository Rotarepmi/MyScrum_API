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
            if(document) return Promise.reject('Email already in use');
          })
      })
      .normalizeEmail(),
    body('username')
      .custom((value, { req }) => {
        return User.findOne({ username: value })
          .then(document => {
            if(document) return Promise.reject('Username already in use'); 
          })
      })
      .trim().not().isEmpty(),
    body('password').trim().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('Password should contain uppercase and digit')
  ]
}