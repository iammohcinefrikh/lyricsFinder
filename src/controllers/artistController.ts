// import the request and response types from express
import { Request, Response } from "express";
// import the artist model from the database model
import { Artist } from "../models/databaseModel";
import { User } from "../models/databaseModel";
// import the handleresponse function from the handleresponsehelper module
import { handleResponse } from "../helpers/handleResponseHelper";

// define the request body for adding an Artist
interface ArtistRequestBody {
  artistFirstName: string;
  artistLastName: string;
  artistPicture: string;
  genre: string;
  born_date: Date;
  born_city: string;
  died_date: Date
}

// define the request body for modifiying an Artist
interface UpdateArtistRequestBody {
  artistFirstName: string;
  artistLastName: string;
  artistPicture: string;
  genre: string;
  born_date: Date;
  born_city: string;
  died_date: Date
}

export const createArtist = async (request: Request, response: Response) => {
  try {
    // Check if the user is an admin
    //check the user is admin
    if (!request.user || !request.user.email) {
      return handleResponse(response, 404, "error", "Not Found", "User account not found.");
    }
    const userEmail = request.user.email;
     // check if the user exists
     const existingAdmin = await User.findOne({ userEmail });
    
     if (!existingAdmin) {
       // if user does not exist, return a not found error
       return handleResponse(response, 404, "error", "Not Found", "User account not found.");
     }

     if (!existingAdmin.isAdmin){
      return handleResponse(response, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
     }

     // extract user details from the request body
    const { artistFirstName,
      artistLastName,
      artistPicture,
      genre,
      born_date,
      born_city,
      died_date
    }: ArtistRequestBody = request.body;

    // check if the Artist already exists
    const existingArtist = await Artist.findOne({ artistFirstName, artistLastName });

    if (existingArtist) {
      // if Artist exists, return a conflict error
      return handleResponse(response, 409, "error", "Conflict", "Artist already exists.");
    }
    
    else {

      // create a new user
      const newArtist = new Artist({
        artistFirstName: artistFirstName,
        artistLastName: artistLastName,
        artistPicture: artistPicture,
        genre: genre,
        born_date: born_date,
        born_city: born_city,
        died_date: died_date
      });

      // save the new user to the database
      await newArtist.save();

      // return a success response
      handleResponse(response, 201, "success", "Created", "User registered successfully.");
    }
  } catch (error) {
    response.status(400).send(error);
  }
}

// async update Artist
export const updateArtist = async (request: Request, response: Response) => {
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

    const userId = request.params.id; 
      // extract user details from the request body
    const { artistFirstName,
      artistLastName,
      artistPicture,
      genre,
      born_date,
      born_city,
      died_date
    }: UpdateArtistRequestBody = request.body;
  

    const updatedUser = await Artist.findByIdAndUpdate(userId, {artistFirstName,artistLastName,artistPicture,
                                                                genre,born_date,born_city,died_date},
                                                                { new: true });

    if (!updatedUser) {
      return handleResponse(response, 404, "error", "Not Found", "User account not found.");
    }
    // return a success response
    handleResponse(response, 201, "success", "Updated", "Artist Updated successfully.");

  } catch (error) {
    handleResponse(response, 500, "error", "Internal Server Error", "Failed to update user.");
  }
}


// async function to get all artists
export const getArtists = async (request: Request, response: Response) => {
  try {
    // try to find all existing artists in the database
    const existingArtists = await Artist.find({});

    // if successful, send a response with the status code 200 and the list of artists
    response.status(200).json({
      "statusCode": 200,
      "success": "OK",
      "message": "Artists list retrieved successfully.",
      "artists": existingArtists
    });
  }

  // catch any errors that occur during the process
  catch (error) {
    // if an error occurs, use the handleresponse function to send an error response
    handleResponse(response, 500, "error", "Internal Server Error", "Failed to retrieve artists.");
  }
}