import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    live: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
