import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'root']
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema);