import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
    name: String,
    creator: {
        first_name: String,
        last_name: String,
        id: Object
    },
    participants: [{
        first_name: String,
        last_name: String,
        id: Object
    }],
    tasks: [{
        name: String,
        id: Object
    }]
}, {
    timestamps: true
});

export default mongoose.model('Project', ProjectSchema);