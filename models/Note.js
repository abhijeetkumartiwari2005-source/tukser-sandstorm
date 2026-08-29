import mongoose from 'mongoose';
const noteSchemsa=new mongoose.Schema(
{
    title: {
      type: String,
      required: [true, 'creditcards'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    body: {
      type: String,
      required: [true, 'credit cards details should be private']
    },
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true 
  });
  const Note=mongoose.model('Note',noteSchemsa);
  export default Note;
