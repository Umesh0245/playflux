import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Product image is required']
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Keyboard', 'Mouse', 'Headset', 'Monitor', 'Controller', 'Chair', 'Desk', 'Mousepad']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    features: {
      type: [String],
      default: []
    },
    inStock: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
