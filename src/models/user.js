import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    company: {
        name: String,
        id: Object
    },
    projects: [{
        name: String,
        id: Object
    }],
    tasks: [{
        name: String,
        id: Object
    }],
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', UserSchema);