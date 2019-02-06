import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    first_name: String,
    last_name: String,
    company: String,
    projects: [{
        name: String,
        _id: Schema.Types.ObjectId
    }],
    tasks: [{
        name: String,
        _id: Schema.Types.ObjectId
    }],
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', UserSchema);