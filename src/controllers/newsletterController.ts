// import the request and response types from express
import { Request, Response } from "express";
// import the artist model from the database model
import { User } from "../models/databaseModel";
// import the handleresponse function from the handleresponsehelper module
import { handleResponse } from "../helpers/handleResponseHelper";
import { sendNewsletter } from "../utils/sendNwesLetter";
import { request } from "http";


export const newsletterSend = async(request: Request, response: Response) => {
    try {
            //check the user is admin
        if (!request.user || !request.user.email) {
            return handleResponse(response, 404, "error", "Not Found", "User account not found1000.");
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

         // Find users with isAdmin false and subscribed
        const emails = await User.find({ isAdmin: false , isSubscribed: true}).select('userEmail');

        // Extract emails
        const emailUsers = emails.map(user => user.userEmail);

        sendNewsletter(emailUsers);

    } catch (error) {
        handleResponse(response, 500, "error", "Internal Server Error", "Failed to send newsletter.");
    }
}


export const subscribeUser = async (request: Request, response: Response) => {
    try {
        if (!request.user || !request.user.email) {
            return handleResponse(response, 404, "error", "Not Found", "User account not found.");
        }

        const userEmail = request.user.email;

        // Check if the user exists
        const existingUser = await User.findOne({ userEmail });

        if (!existingUser) {
            return handleResponse(response, 404, "error", "Not Found", "User account not found.");
        }

        // Check if the user is already subscribed
        if (existingUser.isSubscribed === true) {
            return handleResponse(response, 409, "error", "Conflict", "User is already subscribed.");
        }

        // Update the user's subscription status
        existingUser.isSubscribed = true;
        await existingUser.save();

        return handleResponse(response, 200, "success", "OK", "User subscribed successfully.");
    } catch (error) {
        return handleResponse(response, 500, "error", "Internal Server Error", "Failed to subscribe user.");
    }
};

export const unSubscribeUser = async (request: Request, response: Response) => {
    try {
        if (!request.user || !request.user.email) {
            return handleResponse(response, 404, "error", "Not Found", "User account not found.");
        }

        const userEmail = request.user.email;

        // Check if the user exists
        const existingUser = await User.findOne({ userEmail });

        if (!existingUser) {
            return handleResponse(response, 404, "error", "Not Found", "User account not found.");
        }

        // Check if the user is already unsubscribed
        if (!existingUser.isSubscribed) {
            return handleResponse(response, 409, "error", "Conflict", "User is already unSubscribed.");
        }

        // Update the user's subscription status
        existingUser.isSubscribed = false;
        await existingUser.save();

        return handleResponse(response, 200, "success", "OK", "User unSubscribed successfully.");
    } catch (error) {
        return handleResponse(response, 500, "error", "Internal Server Error", "Failed to subscribe user.");
    }
};


