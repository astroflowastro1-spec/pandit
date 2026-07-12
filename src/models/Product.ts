import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: String,
    default: "General",
  },
  priceInr: {
    type: Number,
    required: true,
  },
  priceUsd: {
    type: Number,
    required: true,
  },
  originalPriceInr: {
    type: Number,
  },
  originalPriceUsd: {
    type: Number,
  },
  imageSrc: {
    type: String,
    required: [true, 'Please provide an image for the product'],
  },
  stock: {
    type: Number,
    default: 100,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
