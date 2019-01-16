import User from '../models/user';

export default {
    async register(req, res, next) {
        const { first_name, last_name, email, password } = req.body;
        const user = new User({ first_name, last_name, email });
        await User.register(user, password);

        res.send('User created successfully. Now you can log in.');
    }
}