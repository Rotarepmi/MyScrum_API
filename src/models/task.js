import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    name: String,
    description: String,
    status: String,
    creator: {
        username: String,
        _id: Schema.Types.ObjectId
    },
    project: {
        name: String,
        _id: Schema.Types.ObjectId
    },
    users: [{
        username: String,
        _id: Schema.Types.ObjectId
    }],
    }, {
        timestamps: true
    });

export default mongoose.model('Task', TaskSchema);