import { Request, Response } from 'express';
import { Song, SongDocument } from '../models/song.model';

// Function to get all songs
export async function getAllSongs(req: Request, res: Response): Promise<void> {
  try {
    const songs = await Song.find().exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving songs' });
  }
}

// Function to get a song by id
export async function getSongById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const song = await Song.findById(id).exec();
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      res.json(song);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving song' });
  }
}

// Function to add a song
export async function addSong(req: Request, res: Response): Promise<void> {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.json(newSong);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding song' });
  }
}

// Function to update a song
export async function updateSong(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      res.json(song);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating song' });
  }
}

// Function to delete a song
export async function deleteSong(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    await Song.findByIdAndDelete(id).exec();
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song' });
  }
}


// Function to get songs by artist
export async function getSongsByArtist(req: Request, res: Response): Promise<void> {
  try {
    const artist = req.query.artist;
    const songs = await Song.find({ artist: { $regex: artist, $options: 'i' } }).exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by artist' });
  }
}

// Function to get songs by genre
export async function getSongsByGenre(req: Request, res: Response): Promise<void> {
  try {
    const genre = req.query.genre;
    const songs = await Song.find({ genre: { $regex: genre, $options: 'i' } }).exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by genre' });
  }
}

// Function to get songs by date
export async function getSongsByDate(req: Request, res: Response): Promise<void> {
  try {
    const recordedDate = req.query.recordedDate;
    const songs = await Song.find({ recordedDate: recordedDate }).exec();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by date' });
  }
}
//Function to get songs by partial search
export async function getSongsByLyrics(req: Request, res: Response): Promise<void> {
  try {
    const lyrics = req.query.lyrics; // Assuming the lyrics are passed as a query parameter
    const songs = await Song.find({
      lyrics: { $regex: lyrics, $options: 'i' } // Use regex for partial match and ignore case
    }).exec();

    if (songs.length === 0) {
      res.status(404).json({ message: 'No songs found with those lyrics' });
    } else {
      res.json(songs);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by partial lyrics' });
  }
}