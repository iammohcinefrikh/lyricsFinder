import mongoose, { Document } from 'mongoose';

const songSchema = new mongoose.Schema({
  id: String,
  genre: String,
  title: String,
  recordedDate: Date,
  lyrics: String
});

export interface SongDocument extends Document {
  id: string;
  genre: string;
  title: string;
  recordedDate: Date;
  lyrics: string;
}

export const Song = mongoose.model<SongDocument>('Song', songSchema);