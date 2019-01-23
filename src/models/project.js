import mongoose from 'mongoose';

const Project = mongoose.Schema({
    name: String,
    creator: Object,
    participants: Array
}, {
    timestamps: true
});

export default mongoose.model('Project', Project);