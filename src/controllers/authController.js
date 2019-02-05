import User from '../models/user';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res, next) {
        // generate token
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });

        // return token
        return res.status(200).json({ token: token });
    },

    async register(req, res, next) {
        const { first_name, last_name, email, company, password } = req.body;
        const user = new User({ first_name, last_name, email, company });
        await User.register(user, password);

        res.status(201).json({ message: 'User created successfully. Now you can log in.' });
    }
}