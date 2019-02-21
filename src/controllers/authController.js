import User from '../models/user';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';

export default {
  async login(req, res, next) {
    // generate token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });

    // return token
    return res.status(200).json({ username: req.user.username, _id: req.user._id, token: token });
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