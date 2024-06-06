// import the request and response types from express
import { Request, Response } from "express";
// import the artist model from the database model
import { Artist } from "../models/databaseModel";
// import the handleresponse function from the handleresponsehelper module
import { handleResponse } from "../helpers/handleResponseHelper";

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