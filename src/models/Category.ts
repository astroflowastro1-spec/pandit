import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
