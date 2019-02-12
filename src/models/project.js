import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    username: String,
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  users: [{
    username: String,
    _id: Schema.Types.ObjectId
  }],
  epics: [{
    description: String,
    state: Boolean
  }],
  tasks: [{
    name: String,
    _id: Schema.Types.ObjectId
  }]
}, {
    timestamps: true
  });

export default mongoose.model('Project', ProjectSchema);