import express, { Router } from 'express';
import {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong,
  getSongsByLyrics,
  getSongsByArtist,
  getSongsByGenre,
  getSongsByDate
} from '../controllers/songController';
import { handleValidationErrors, validateSongData } from '../middlewares/validationMiddleware';

const router: Router = express.Router();

// Get all songs
router.get('/songs', getAllSongs);

// Get a song by ID
router.get('/songs/:id', getSongById);

// Add a new song
router.post('/songs',validateSongData,handleValidationErrors, addSong);

// Update a song
router.put('/songs/:id', updateSong);

// Delete a song
router.delete('/songs/:id', deleteSong);

// Get songs by lyrics
router.get('/songs/search/lyrics', getSongsByLyrics);

// Get songs by artist
router.get('/songs/search/artist', getSongsByArtist);

// Get songs by genre
router.get('/songs/search/genre', getSongsByGenre);

// Get songs by date
router.get('/songs/search/date', getSongsByDate);

export default router;
