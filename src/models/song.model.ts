import mongoose, { Document } from 'mongoose';

const songSchema = new mongoose.Schema({
  genre: String,
  title: String,
  recordedDate: Number,
  lyrics: String
});

export interface SongDocument extends Document {
  genre: string;
  title: string;
  recordedDate: Number;
  lyrics: string;
}

export const Song = mongoose.model<SongDocument>('Song', songSchema);