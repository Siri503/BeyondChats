import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
 symbol: {
   type: String,
   required: true,
   trim: true,
 },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Tech', 'Health', 'Finance', 'Energy', 'Others'], // example categories
    default: 'Others',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
