import User from '../models/user';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import passport from 'passport';

export default {
  async login(req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });

      return res.status(200).json({ message: 'Logged in successfully', username: user.username, _id: user._id, token: token });
    })(req, res, next);
  },

  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.status = 422;
      error.data = errors.array();
      throw error;
    }

    const { username, email, first_name, last_name, company, password } = req.body;
    const user = new User({ username, email, first_name, last_name, company, password });
    await User.register(user, password);

    res.status(201).json({
      message: 'User created successfully. Now you can log in.',
      email: user.email
    });
  }
}