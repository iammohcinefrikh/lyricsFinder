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
import { verifyToken } from '../utils/verifyTokenUtil';

const router: Router = express.Router();

// Get all songs
router.get('/api/v1/songs',verifyToken, getAllSongs);

// Get a song by ID
router.get('/api/v1/songs/:id',verifyToken, getSongById);

// Add a new song
router.post('/api/v1/songs',verifyToken,validateSongData,handleValidationErrors, addSong);

// Update a song
router.put('/api/v1/songs/:id',verifyToken, updateSong);

// Delete a song
router.delete('/api/v1/songs/:id',verifyToken, deleteSong);

// Get/api/v1 songs by lyrics
router.get('/api/v1/songs/search/lyrics',verifyToken, getSongsByLyrics);

// Get/api/v1 songs by artist
router.get('/api/v1/songs/search/artist',verifyToken, getSongsByArtist);

// Get/api/v1 songs by genre
router.get('/api/v1/songs/search/genre',verifyToken, getSongsByGenre);

// Get/api/v1 songs by date
router.get('/api/v1/songs/search/date',verifyToken, getSongsByDate);

export default router;
