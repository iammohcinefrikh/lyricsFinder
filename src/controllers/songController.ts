import { Request, Response } from 'express';
import { Song, SongDocument } from '../models/song.model';
import { handleResponse } from '../helpers/handleResponseHelper';
import { User } from '../models/databaseModel';

// Function to get all songs
export async function getAllSongs(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const songs = await Song.find().exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving songs' });
  }
}

// Function to get a song by id
export async function getSongById(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const id = req.params.id;
    const song = await Song.findById(id).exec();
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      res.status(200).json(song);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving song' });
  }
}

// Function to add a song
export async function addSong(req: Request, res: Response): Promise<void> {
  try {
     //check the user is admin
     if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
    console.log(userEmail)
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }

     if (!existingUser.isAdmin){
      return handleResponse(res, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
     }
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(200).json(newSong);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding song' });
  }
}

// Function to update a song
export async function updateSong(request: Request, response: Response): Promise<void> {
  try {
     //check the user is admin
     if (!request.user || !request.user.email) {
      return handleResponse(response, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = request.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(response, 404, "error", "Not Found", "User account not found.");
     }

     if (!existingUser.isAdmin){
      return handleResponse(response, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
     }
    const id = request.params.id;
    const song = await Song.findByIdAndUpdate(id, request.body, { new: true }).exec();
    if (!song) {
      response.status(404).json({ message: 'Song not found' });
    } else {
      response.status(200).json(song);
    }
  } catch (error) {
    response.status(500).json({ message: 'Error updating song' });
  }
}

// Function to delete a song
export async function deleteSong(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const id = req.params.id;
    await Song.findByIdAndDelete(id).exec();
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting song' });
  }
}


// Function to get songs by artist
export async function getSongsByArtist(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const artist = req.query.q;
    const songs = await Song.find({songArtistId: artist }).exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by artist' });
  }
}

// Function to get songs by genre
export async function getSongsByGenre(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const genre = req.query.q;
    const songs = await Song.find({ genre: { $regex: genre, $options: 'i' } }).exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by genre' });
  }
}

// Function to get songs by date
export async function getSongsByDate(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const recordedDate = req.query.q;
    const songs = await Song.find({ recordedDate }).exec();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by date' });
  }
}
//Function to get songs by partial search
export async function getSongsByLyrics(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user || !req.user.email) {
      return handleResponse(res, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = req.user.email;
     // check if the user exists
     const existingUser = await User.findOne({ userEmail });
    
     if (!existingUser) {
       // if user does not exist, return a not found error
       return handleResponse(res, 404, "error", "Not Found", "User account not found.");
     }
    const lyrics = req.query.q; // Assuming the lyrics are passed as a query parameter
    const songs = await Song.find({
      lyrics: { $regex: lyrics, $options: 'i' } // Use regex for partial match and ignore case
    }).exec();

    if (songs.length === 0) {
      res.status(404).json({ message: 'No songs found with those lyrics' });
    } else {
      res.status(200).json(songs);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching songs by partial lyrics' });
  }
}