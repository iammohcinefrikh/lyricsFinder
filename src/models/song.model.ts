import mongoose, { Document } from 'mongoose';

const songSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  recordedDate: {
    type: Date,
    required: true
  },
  lyrics: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  }
});

export interface SongDocument extends Document {
  genre: string;
  title: string;
  recordedDate: Number;
  lyrics: string;
}

export const Song = mongoose.model<SongDocument>('Song', songSchema);