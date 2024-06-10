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
router.get('/api/v1/songs', getAllSongs);

// Get a song by ID
router.get('/api/v1/songs/:id', getSongById);

// Add a new song
router.post('/api/v1/songs',validateSongData,handleValidationErrors, addSong);

// Update a song
router.put('/api/v1/songs/:id', updateSong);

// Delete a song
router.delete('/api/v1/songs/:id', deleteSong);

// Get/api/v1 songs by lyrics
router.get('/api/v1/songs/search/lyrics', getSongsByLyrics);

// Get/api/v1 songs by artist
router.get('/api/v1/songs/search/artist', getSongsByArtist);

// Get/api/v1 songs by genre
router.get('/api/v1/songs/search/genre', getSongsByGenre);

// Get/api/v1 songs by date
router.get('/api/v1/songs/search/date', getSongsByDate);

export default router;
