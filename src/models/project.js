import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name: String,
    creator: {
        username: String,
        _id: Schema.Types.ObjectId
    },
    users: [{
        username: String,
        _id: Schema.Types.ObjectId
    }],
    tasks: [{
        name: String,
        _id: Schema.Types.ObjectId
    }]
}, {
    timestamps: true
});

export default mongoose.model('Project', ProjectSchema);