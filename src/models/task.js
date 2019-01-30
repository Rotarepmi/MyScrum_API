import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    name: String,
    description: String,
    status: String,
    creator: {
      first_name: String,
      last_name: String,
      id: Object
    },
    project: {
        name: String,
        id: Object
    },
    users: [{
        first_name: String,
        last_name: String,
        id: Object
    }],
}, {
    timestamps: true
});

export default mongoose.model('Task', TaskSchema);