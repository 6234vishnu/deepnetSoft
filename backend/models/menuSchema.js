import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
    trim: true,
  },
  menuDescription: {
    type: String,
    default: '',
    trim: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
  }],
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);

