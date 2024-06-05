import { Song, SongDocument } from '../models/song.model';
import mongoose from 'mongoose';

// Function to get all songs
export async function getAllSongs(): Promise<SongDocument[]> {
  try {
    const songs = await Song.find().exec();
    return songs;
  } catch (error) {
    throw error;
  }
}

// Function to get a song by id
export async function getSongById(id: string): Promise<SongDocument | null> {
  try {
    const song = await Song.findById(id).exec();
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  } catch (error) {
    throw error;
  }
}

// Function to add a song
export async function addSong(song: SongDocument): Promise<SongDocument> {
  try {
    const newSong = new Song(song);
    await newSong.save();
    return newSong;
  } catch (error) {
    throw error;
  }
}

// Function to update a song
export async function updateSong(id: string, song: SongDocument): Promise<SongDocument | null> {
  try {
    const updatedSong = await Song.findByIdAndUpdate(id, song, { new: true }).exec();
    if (!updatedSong) {
      throw new Error('Song not found');
    }
    return updatedSong;
  } catch (error) {
    throw error;
  }
}

// Function to delete a song
export async function deleteSong(id: string): Promise<void> {
  try {
    await Song.findByIdAndDelete(id).exec();
  } catch (error) {
    throw error;
  }
}

// Function to get songs by lyrics
export async function getSongsByLyrics(lyrics: string): Promise<SongDocument[]> {
  try {
    const songs = await Song.find({ lyrics: { $regex: lyrics, $options: 'i' } }).exec();
    return songs;
  } catch (error) {
    throw error;
  }
}

// Function to get songs by artist
export async function getSongsByArtist(artist: string): Promise<SongDocument[]> {
  try {
    const songs = await Song.find({ artist: { $regex: artist, $options: 'i' } }).exec();
    return songs;
  } catch (error) {
    throw error;
  }
}

// Function to get songs by genre
export async function getSongsByGenre(genre: string): Promise<SongDocument[]> {
  try {
    const songs = await Song.find({ genre: { $regex: genre, $options: 'i' } }).exec();
    return songs;
  } catch (error) {
    throw error;
  }
}

// Function to get songs by date
export async function getSongsByDate(recordedDate: Date): Promise<SongDocument[]> {
  try {
    const songs = await Song.find({ recordedDate: recordedDate }).exec();
    return songs;
  } catch (error) {
    throw error;
  }
}
